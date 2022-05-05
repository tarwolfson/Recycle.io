from flask import Flask, jsonify

from Data.Providers import ItemProviderRedis

app = Flask(__name__)
provider = ItemProviderRedis()


@app.route("/item/<name>")
def get_item(name: str) -> dict:
    return jsonify(provider.get(name))

@app.route("/items")
def get_items() -> dict:
    return jsonify(provider.get_all())


if __name__=="__main__":
    app.run(host='0.0.0.0', port=5000)