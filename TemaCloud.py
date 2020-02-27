from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# If modifying these scopes, delete the file token.pickle.
from googleapiclient.http import MediaFileUpload
# import logging
#
# logging.basicConfig(level=logging.DEBUG)

import logging
from http.client import HTTPConnection  # py3

log = logging.getLogger('urllib3')
log.setLevel(logging.DEBUG)

# logging from urllib3 to console
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
log.addHandler(ch)

# print statements from `http.client.HTTPConnection` to console/stdout
HTTPConnection.debuglevel = 1
import sys
# sys
# sys.stdout = open('/home/sno/Desktop/index2.txt', 'w')



SCOPES = ['https://www.googleapis.com/auth/drive']



from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import os
g_login = GoogleAuth()
g_login.LocalWebserverAuth()
drive = GoogleDrive(g_login)



import requests
import shutil

def uploadToGoogleDrive(filePath,word):
    """Shows basic usage of the Drive v3 API.
    Prints the names and ids of the first 10 files the user has access to.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'client_secrets.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('drive', 'v3', credentials=creds)


    # Call the Drive v3 API
    results = service.files().list(
        pageSize=10, fields="nextPageToken, files(id, name)").execute()
    items = results.get('files', [])

    # if not items:
    #     print('No files found.')
    # else:
    #     print('Files:')
    #     for item in items:
    #         print(u'{0} ({1})'.format(item['name'], item['id']))

    # with open(filePath,"rb") as file:
    #     #do something here with file
    #     file_drive = drive.CreateFile({'title':os.path.basename("fisier")})
    #     # file_drive.SetContentString(file.read())
    #     file_drive.SetContentFile(file.read())
    #     file_drive.Upload()

    file_metadata = {'name':word+'.jpg'}
    media = MediaFileUpload(filePath,
                            mimetype='image/jpeg')
    file = service.files().create(body = file_metadata,
                                media_body = media,
                                fields = 'id').execute()

    print(file.get('id'))
    # print(requests.get("http://127.0.0.1").elapsed.total_seconds())
    print("UPLOADING...")

    # print("\033[1;32;40m POST [IMAGE TO DRIVE]-->"+str(resp.elapsed.total_seconds())+"SECONDS")





# def getImageByWord(query):
#
#     import requests
#     import random
#
#     r = requests.get("https://api.qwant.com/api/search/images",
#                      params={
#                          'count': 50,
#                          'q': str(query),
#                          't': 'images',
#                          'safesearch': 1,
#                          'locale': 'en_US',
#                          'uiv': 4
#                      },
#                      headers={
#                          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
#                      }
#                      )
#
#     response = r.json().get('data').get('result').get('items')
#     urls = [r.get('media') for r in response]
#
#     x = random.choice(urls)
#
#     resp = requests.get(x,stream = True)
#
#     filePath = "/home/sno/Desktop/ceva.jpg"
#
#     localFile = open(filePath,"wb")
#     resp.raw.decode_content = True
#     shutil.copyfileobj(resp.raw,localFile)
#
#     del resp
#     # import time
#     # time.sleep(2)
#     print("GET IMAGE")
#     # return
#     # uploadToGoogleDrive(filePath)
#
#     # print(random.choice(urls))


#OFFLINE_VER
# def getImageByWord(word):
#
#     with open("/home/sno/Desktop/APIS" , "r") as file:
#         f = file.read()
#     import json
#     # r = {}
#     dictionary = json.loads(f)
#     l = dictionary['image_results']
#
#     import random
#
#     r = random.randint(0,len(l)-2)
#
#     d = {}
#     d = l[r]
#
#     print(d['image'])
#     link = d['image']
#
#     import requests
#     import shutil
#
#     resp = requests.get(link,stream = True)
#     print("\033[1;32;40m GET [IMAGE BY WORD]-->"+str(resp.elapsed.total_seconds())+"SECONDS")
#
#     filePath = "/home/sno/Desktop/ceva.jpg"
#
#     localFile = open(filePath,"wb")
#     resp.raw.decode_content = True
#     shutil.copyfileobj(resp.raw,localFile)
#
#     del resp
#     # uploadToGoogleDrive(filePath,word)
def getImageByWord(word):
    from serpwow.google_search_results import GoogleSearchResults
    import json

    # create the serpwow object, passing in our API key
    serpwow = GoogleSearchResults("EDCA9A4FA04B4ADAB214E10F3C014DF3")
    #
    # # set up a dict for the search parameters
    params = {
        "q" : str(word),
        "search_type" : "images"
    }
    #
    # # retrieve the search results as JSON
    result = serpwow.get_json(params)
    #
    # # pretty-print the result
    # print(json.dumps(result, indent=2, sort_keys=True))
    # with open("/home/sno/Desktop/APIS" , "r") as file:
    #     f = file.read()
    import json
    # r = {}
    # dictionary = json.loads(result)
    l = result['image_results']

    import random

    r = random.randint(0,len(l)-2)

    d = {}
    d = l[r]

    print(d['image'])
    link = d['image']

    import requests
    import shutil

    resp = requests.get(link,stream = True)

    filePath = "/home/sno/Desktop/ceva.jpg"

    localFile = open(filePath,"wb")
    resp.raw.decode_content = True
    shutil.copyfileobj(resp.raw,localFile)

    del resp
    uploadToGoogleDrive(filePath,word)



def getRelatedToColor(color):
    # importing the requests library
    # color = ""
    # api-endpoint
    URL = "https://api.datamuse.com/words?rel_jja="+str(color).lower()+"&max=1"

    r = requests.get(url = URL)

    import json

    data = r.json()
    # d = json.loads(str(data))
    l = list(data)
    x = str(l[0]).split(',')[0].split(':')[1].replace('\'',"").lstrip().rstrip()
    # print(str(l[0]).split(',')[0].split(':')[1].replace('\'',"").lstrip().rstrip())
    print(x)
    #########AICI
    # x = "cat"
    # print("GET RELATED TO COLOR")
    print("\033[1;32;40m GET [NOUN BY COLOR] -->"+str(r.elapsed.total_seconds())+"SECONDS")


    getImageByWord(str(x))
    # global COLOR
    # COLOR= x
#AICIIIIIIIIIIIIIIIII

# getRelatedToColor("black")

with open('/home/sno/Desktop/index2.html', 'r') as file:
    stri = file.read()

lista = stri.replace('\n','<br />')

# sys.stdout = sys.stdout
print(lista)

with open('/home/sno/Desktop/metrics.txt','w') as file:
    for element in lista:
        file.write(element)

from matplotlib import Path
p = Path('/home/sno/Desktop/metrics.txt')
p.rename(p.with_suffix('.html'))
# getRelatedToColor("black")

