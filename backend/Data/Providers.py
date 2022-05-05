import json
import redis


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
        return json.loads(self.redis.get(name).decode())
    
    def get_all(self) -> dict:
        return [json.loads(self.redis.get(item).decode()) for item in self.redis.scan_iter()]