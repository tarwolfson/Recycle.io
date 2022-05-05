from flask import Flask, jsonify, request
import redis
import json

app = Flask(__name__)
r = redis.Redis(host='redis', port=6379, db=0)


@app.route("/item/<name>")
def get_item(name: str):
    ans = r.get(name)
    return jsonify(json.loads(ans.decode()))

@app.route("/items")
def get_items():
    items = [json.loads(r.get(item).decode()) for item in r.scan_iter()]
    return jsonify(items)


if __name__=="__main__":
    app.run(host='0.0.0.0', port=5000)