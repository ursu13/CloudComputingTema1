# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import datetime
import logging
import os
import tempfile
import base64
import requests
from flask import Flask, render_template, request, Response,jsonify
from flask_api import status
import json
from flask_cors import CORS
from werkzeug.utils import secure_filename

import sqlalchemy

from google.cloud import storage
from google.oauth2 import service_account



# Remember - storing secrets in plaintext is potentially unsafe. Consider using
# something like https://cloud.google.com/kms/ to help keep secrets secret.
db_user = "postgres"
db_pass = "postgres"
db_name = "artsales"
# cloud_sql_connection_name = os.environ.get("CLOUD_SQL_CONNECTION_NAME")
cloud_sql_connection_name = "artsales:us-central1:art"

app = Flask(__name__)
CORS(app)

logger = logging.getLogger()

# [START cloud_sql_postgres_sqlalchemy_create]
# The SQLAlchemy engine will help manage interactions, including automatically
# managing a pool of connections to your database
db = sqlalchemy.create_engine(
    # Equivalent URL:
    # postgres+pg8000://<db_user>:<db_pass>@/<db_name>?unix_sock=/cloudsql/<cloud_sql_instance_name>/.s.PGSQL.5432
    sqlalchemy.engine.url.URL(
        drivername='postgres+pg8000',
        username=db_user,
        password=db_pass,
        database=db_name,
        query={
            'unix_sock': '/cloudsql/{}/.s.PGSQL.5432'.format(
                cloud_sql_connection_name)
        }
    ),
    # ... Specify additional properties here.
    # [START_EXCLUDE]

    # [START cloud_sql_postgres_sqlalchemy_limit]
    # Pool size is the maximum number of permanent connections to keep.
    pool_size=5,
    # Temporarily exceeds the set pool_size if no connections are available.
    max_overflow=2,
    # The total number of concurrent connections for your application will be
    # a total of pool_size and max_overflow.
    # [END cloud_sql_postgres_sqlalchemy_limit]

    # [START cloud_sql_postgres_sqlalchemy_backoff]
    # SQLAlchemy automatically uses delays between failed connection attempts,
    # but provides no arguments for configuration.
    # [END cloud_sql_postgres_sqlalchemy_backoff]

    # [START cloud_sql_postgres_sqlalchemy_timeout]
    # 'pool_timeout' is the maximum number of seconds to wait when retrieving a
    # new connection from the pool. After the specified amount of time, an
    # exception will be thrown.
    pool_timeout=30,  # 30 seconds
    # [END cloud_sql_postgres_sqlalchemy_timeout]

    # [START cloud_sql_postgres_sqlalchemy_lifetime]
    # 'pool_recycle' is the maximum number of seconds a connection can persist.
    # Connections that live longer than the specified amount of time will be
    # reestablished
    pool_recycle=1800,  # 30 minutes
    # [END cloud_sql_postgres_sqlalchemy_lifetime]

    # [END_EXCLUDE]
)
# [END cloud_sql_postgres_sqlalchemy_create]

@app.route('/product', methods=['POST'])
def upload_product():
    """Process the uploaded file and upload it to Google Cloud Storage."""
    uploaded_file = request.files.get('filePath')

    data = request.form['product']

    #transform in json
    json_data = json.loads(data)

    
    username = str(json_data['username'])
    product_name = str(json_data['product_name'])
    product_type = str(json_data['product_type'])
    description = str(json_data['description'])
    stock = int(json_data['stock'])
    price = float(json_data['price'])



    cwd = os.getcwd()

    key_path = str(cwd)+"/"+"credentials.json"
    # print("CURRENT ",key_path)
    
    credentials = service_account.Credentials.from_service_account_file(
        key_path)
    if not uploaded_file:
        return 'No file uploaded.', 400


    # Create a Cloud Storage client.
    gcs = storage.Client(credentials=credentials)

    # Get the bucket that the file will be uploaded to.
    bucket = gcs.get_bucket("artsales")

    # Create a new blob and upload the file's content.
    blob = bucket.blob(uploaded_file.filename)

    blob.upload_from_string(
        uploaded_file.read(),
        content_type=uploaded_file.content_type
    )
    blob.make_public()

    image_source = str(blob.public_url)

    # The public URL can be used to directly access the uploaded file via HTTP.
    # return blob.public_url

    with db.connect() as conn:
     
        stmt = sqlalchemy.text(
            "INSERT INTO products(product_name,product_type,description,stock,price,image_source,username) "
            "values(:product_name,:product_type,:description,:stock,:price,:image_source,:username)"
            )
        
    try:
        # Using a with statement ensures that the connection is always released
        # back into the pool at the end of statement (even if an error occurs)
        with db.connect() as conn:
            conn.execute(stmt,product_name=product_name,product_type=product_type,description=description,stock=stock,price=price,image_source=image_source,username=username)
    except Exception as e:
        return "Product could not be created ! ",status.HTTP_409_CONFLICT
    
    d = {
        "username": str(username),
        "product_name": str(product_name),
        "product_type": str(product_type),
        "description": str(description),
        "stock": stock,
        "price": price,
        "image_source": str(image_source)
    }

    return jsonify(d)
    # return "Product created!",status.HTTP_200_OK
    # return str(product_name)+str(product_type)+str(description)+str(stock)+str(price)+str(image_source)


@app.before_first_request
def create_tables():
    # Create tables (if they don't already exist)
    
    

    with db.connect() as conn:
        conn.execute(
            "CREATE TABLE IF NOT EXISTS users "
            "( id SERIAL NOT NULL, username VARCHAR(50), password VARCHAR(50), email VARCHAR(50), fullname VARCHAR(50),"
            " PRIMARY KEY (id), UNIQUE(username) );"
        )

    with db.connect() as conn:
        conn.execute(
            "CREATE TABLE IF NOT EXISTS products "
            "( id SERIAL NOT NULL, product_name VARCHAR(50), product_type VARCHAR(50), description VARCHAR(50), stock INTEGER,"
            "price REAL, image_source VARCHAR(100), username VARCHAR(100),"
            "PRIMARY KEY (id), UNIQUE(product_name) );"
        )
    with db.connect() as conn:
        conn.execute(
            "CREATE TABLE IF NOT EXISTS orders "
            "( id SERIAL NOT NULL, username VARCHAR(50), cart TEXT[],"
            
            "PRIMARY KEY (id));"
        )

@app.route('/login', methods=['POST'])
def login():

    parsed_login_data = request.get_json(force=True)
    username = str(parsed_login_data['username'])
    password = str(parsed_login_data['password'])
    with db.connect() as conn:   
        stmt = sqlalchemy.text(
            "SELECT COUNT(id) FROM users WHERE username=:username and password=:password"
            )
        number_of_users = conn.execute(stmt,username=username,password=password).fetchone()
        count_users = number_of_users[0]
    if int(count_users > 0):
        return "User exists! ",status.HTTP_200_OK
    else:
        return "User does not exist! ",status.HTTP_404_NOT_FOUND

@app.route('/register', methods=['POST'])
def register():

    parsed_login_data = request.get_json(force=True)
    username = str(parsed_login_data['username'])
    password = str(parsed_login_data['password'])
    fullname = str(parsed_login_data['fullname'])
    email = str(parsed_login_data['email'])
    with db.connect() as conn:
     
        stmt = sqlalchemy.text(
            "INSERT INTO users(username,password,fullname,email) values(:username,:password,:fullname,:email)"
            )
    try:
        with db.connect() as conn:
            conn.execute(stmt,username=username,password=password,fullname=fullname,email=email)
    except Exception as e:
        return "User could not be created ! ",status.HTTP_409_CONFLICT
    
    return "User created!",status.HTTP_200_OK

@app.route('/product', methods=['GET'])
def get_all_products():

    d = []
    with db.connect() as conn:   
        stmt = sqlalchemy.text(
            "SELECT product_name,product_type,description,stock,price,image_source,username from products"
            )
    try:
        with db.connect() as conn:
            products = conn.execute(stmt).fetchall()
            for row in products:
                d.append(
                    {
                        "product_name": str(row[0]),
                        "product_type": str(row[1]),
                        "description": str(row[2]),
                        "stock": row[3],
                        "price": row[4],
                        "image_source": str(row[5]),
                        "username":str(row[6])

                    }
                )
    except Exception as e:
        return "No product was found ! ",status.HTTP_204_NO_CONTENT
    
    return jsonify(d)

@app.route('/order', methods=['POST'])
def post_order():

    parsed_login_data = request.get_json(force=True)
    list_of_products = []

    username = str(parsed_login_data['username'])
    list_of_products = list(parsed_login_data['cart'])


    
    with db.connect() as conn:
     
        stmt = sqlalchemy.text(
            "INSERT INTO orders (username,cart) values(:username,:cart)"
            )
    try:
        with db.connect() as conn:
            conn.execute(stmt,username=username,cart=list_of_products)
    except Exception as e:
        return "Order could not be created ! ",status.HTTP_409_CONFLICT
    
    return "Order created!",status.HTTP_200_OK

  



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
