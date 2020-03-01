from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

# configuration
# DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')


@app.route('/')
def home():
    return render_template("home.html")


@app.route('/switch-colour', methods=['POST'])
def postmethod():
    post_data = request.get_json()
    print("post_data: ", post_data)
    return jsonify({"success": "true"})


@app.route('/switch-brightness', methods=['POST'])
def postmethodbright():
    post_data = request.get_json()
    print("post_data: ", post_data)
    return jsonify({"success": "true"})


if __name__ == '__main__':
    app.run()
