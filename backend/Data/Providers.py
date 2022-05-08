import json
import redis
import logging

logging.basicConfig( level=logging.DEBUG, format="%(asctime)s:%(levelname)s:%(message)s")
log = logging.getLogger("providers")


class ItemProviderInterface:
    """Gets an item by name"""
    def get(self, name: str) -> dict:
        pass
    """Gets all items"""
    def get_all(self) -> dict:
        pass

class ItemProviderRedis(ItemProviderInterface):
    def __init__(self, host='redis', port=6379, db=0):
        self.redis = redis.Redis(host, port, db, decode_responses=True)

    def get(self, name: str) -> dict:
        res = self.redis.hget(name, "data")
        log.info(res)
        if res:
            record = json.loads(res)
            log.info(record)
            record["hits"] = self.redis.hincrby(record["name"], "hits", 1)
            return record
        
        return {}
    
    def get_all(self) -> dict:
        records = []
        for item in self.redis.scan_iter():
            record = self.redis.hgetall(item)
            data = json.loads(record["data"])
            data["hits"] = record["hits"]
            records.append(data)
        return records