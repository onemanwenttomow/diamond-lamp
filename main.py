from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
# import unicornhat as uh
# uh.set_layout(uh.PHAT)
# uh.brightness(0.5)


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
    color = post_data['color'];
    r = None
    g = None
    b = None

    if color == 'diamond':
        print("DIAMOND!")
        r = 69
        g = 172
        b = 165
    elif color == 'gold':
        print("GOLD!")
        r = 255
        g = 170
        b = 0
    elif color == 'lapis':
        print("lapis!")
        r = 13
        g = 42
        b = 151
    elif color == 'iron':
        print("iron!")
        r = 173
        g = 140
        b = 118
    elif color == 'red':
        print("red!")
        r = 204
        g = 0
        b = 0
    print("rgb", r, g, b)
    # for x in range(8):
    #     for y in range(4):
    #         uh.set_pixel(x, y, r, g, b)
    # uh.show()
    return jsonify({"success": "true"})


@app.route('/switch-brightness', methods=['POST'])
def postmethodbright():
    post_data = request.get_json()
    print("post_data: ", post_data['opacity'])
    # uh.brightness(post_data['opacity'])
    # uh.show()

    return jsonify({"success": "true"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
