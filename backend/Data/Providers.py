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
    def __init__(self):
        self.redis = redis.Redis(host='redis', port=6379, db=0)

    def get(self, name: str) -> dict:
        res = self.redis.get(name)
        
        if res:
            record = json.loads(res.decode())
            log.info(record)
            record["hits"] = record["hits"] + 1
            self.redis.set(name, json.dumps(record))
            return record
        
        return {}
    
    def get_all(self) -> dict:
        return [json.loads(self.redis.get(item).decode()) for item in self.redis.scan_iter()]