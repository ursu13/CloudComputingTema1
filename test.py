from serpwow.google_search_results import GoogleSearchResults
import json

# create the serpwow object, passing in our API key
serpwow = GoogleSearchResults("EDCA9A4FA04B4ADAB214E10F3C014DF3")
#
# # set up a dict for the search parameters
params = {
    "q" : "dog",
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
#script
# for i in range(0,50):
#     for j in range(0,50)
#         import TemaCloud
#         TemaCloud.getImageByWord("word")
#     import time
#     time.sleep(2)