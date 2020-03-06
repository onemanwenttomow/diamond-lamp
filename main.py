from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

# configuration
# DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

class Colours:
    def __init__(self, r, g, b):
        self.r = r
        self.g = g
        self.b = b

diamond = Colours(69,172,165)
gold = Colours(255,170,0)
iron = Colours(173,140,118)
lapis = Colours(13,42,151)
red = Colours(204,0,0)

print(diamond.r, diamond.g, diamond.b)

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
    print("post_data: ", post_data['color'])
    return jsonify({"success": "true"})


@app.route('/switch-brightness', methods=['POST'])
def postmethodbright():
    post_data = request.get_json()
    print("post_data: ", post_data)
    return jsonify({"success": "true"})


if __name__ == '__main__':
    app.run()
