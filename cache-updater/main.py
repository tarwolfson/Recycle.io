import sched
import time
import redis
import pymongo
import logging

r = redis.Redis(host='redis', port=6379, db=0)
s = sched.scheduler(time.time, time.sleep)
myclient = pymongo.MongoClient("mongodb://mongodb:27017/", username="recycleio", password="S3cret")
mydb = myclient["recycleio"]
mycol = mydb["items"]

def update():
    mongo_items = [{"name": x["name"], "value": x["value"] } for x in mycol.find()]
    for item in mongo_items:
        r.set(item["name"], item["value"])
    print(mongo_items)

    s.enter(5, 1, update, ())


s.enter(5, 1, update, ())
s.run()
logging.info("Started cache updater")