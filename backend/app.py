from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import configparser

from Data.Providers import ItemProviderRedis


app = Flask(__name__)
provider = ItemProviderRedis()
config = configparser.ConfigParser()
config.read('backend.ini')
app.config["port"] = config["APP"].getint("port")
app.config["redisHostname"] = config["REDIS"].get("hostname")
app.config["redisPort"] = config["REDIS"].getint("port")
app.config["redisDb"] = config["REDIS"].getint("db")
app.config["corsAllow"] = config["CORS"].get("allow")
CORS(app, resources={r"/*": {"origins": app.config["corsAllow"]}})

@app.route("/item/<name>")
def get_item(name: str) -> dict:
    return (provider.get(name))

@app.route("/items")
def get_items() -> dict:
    return jsonify(provider.get_all())


if __name__=="__main__":
    app.run(host='0.0.0.0', port=app.config["port"])