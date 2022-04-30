from flask import Flask, jsonify, request
import redis

app = Flask(__name__)
r = redis.Redis(host='localhost', port=6379, db=0)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/item/<name>")
def get_item(name: str):
    ans = r.get(name)
    return jsonify(ans.decode())


if __name__=="__main__":
    app.run(host='0.0.0.0', port=5001)