import sched
import time
import redis
import pymongo
import logging
import json

r = redis.Redis(host='redis', port=6379, db=0)
s = sched.scheduler(time.time, time.sleep)
myclient = pymongo.MongoClient("mongodb://mongodb:27017/", username="recycleio", password="S3cret")
mydb = myclient["recycleio"]
mycol = mydb["items"]

def update():
    mongo_items = [x for x in mycol.find()]
    for item in mongo_items:
        del item["_id"]
        r.set(item["name"], json.dumps(item))
    print(mongo_items)

    s.enter(5, 1, update, ())


s.enter(5, 1, update, ())
s.run()