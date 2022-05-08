import sched
import time
import redis
import pymongo
import logging
import json

redis_client = redis.Redis(host='redis', port=6379, db=0)
scheduler = sched.scheduler(time.time, time.sleep)
myclient = pymongo.MongoClient("mongodb://mongodb:27017/", username="recycleio", password="S3cret")
mydb = myclient["recycleio"]
mycol = mydb["items"]
logging.basicConfig( level=logging.DEBUG, format="%(asctime)s:%(levelname)s:%(message)s")
log = logging.getLogger("cache-updater")

def update():
    log.info("Updating cache...")
    for item in mycol.find():
        del item["_id"]
        redis_client.hset(item["name"], "data", json.dumps(item))
        redis_client.hsetnx(item["name"], "hits", 0)

    scheduler.enter(5, 1, update, ())


scheduler.enter(5, 1, update, ())
scheduler.run()