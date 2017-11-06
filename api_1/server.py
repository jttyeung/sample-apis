from flask import Flask, render_template, redirect
from flask_restful import reqparse, abort, Resource, Api
from flask_debugtoolbar import DebugToolbarExtension
import jinja2

from model import *
from db_queries import *


app = Flask(__name__)
api = Api(app)

# jinja debugger
app.jinja_env.undefined = jinja2.StrictUndefined
app.jinja_env.auto_reload = True


@app.route('/')
def homepage():
    """ Brings user to the homepage. """
    return render_template('index.html')


def error_if_nonexistent_fm_id(fm_id):
    """ Returns an error message if farmer's market id is not found. """

    fm_ids = get_market_ids()

    try:
        # Convert URL query string to INT to compare to fm_ids
        if int(fm_id) not in fm_ids:
            abort(404, message='Farmer\'s market {} not found'.format(fm_id))
    except:
        # Catches non-integer fm_id requests
        abort(404, message='Farmer\'s market {} is not a valid format. Use digits only.'.format(fm_id))

def error_if_nonexistent_state_id(state_id):
    """ Returns an error message if state id is not found. """

    state_ids = get_state_ids()

    # Capitalize state to match DB
    if state_id.upper() not in state_ids:
        abort(404, message='State abbreviation {} not valid.'.format(state_id))


class MarketListAPI(Resource):
    """ Resource for full list of farmer's markets. """

    def get(self):
        return get_markets()


class MarketAPI(Resource):
    """ Resource for individual farmer's markets. """

    def get(self, fm_id):
        error_if_nonexistent_fm_id(fm_id)
        return get_market_by_id(fm_id)

    def delete(self, fm_id):
        error_if_nonexistent_fm_id(fm_id)
        return '', 204

    def put(self, fm_id):
        error_if_nonexistent_fm_id(fm_id)
        pass


class MarketStateAPI(Resource):
    """ Resource for individual farmer's markets. """

    def get(self, state_id):
        error_if_nonexistent_state_id(state_id)
        return get_market_by_state(state_id)


# Set up the API resource routing
api.add_resource(MarketListAPI, '/markets')
api.add_resource(MarketAPI, '/market/<fm_id>')
api.add_resource(MarketStateAPI, '/markets/<state_id>') # move to marketlistapi
# add limit/offset to get parameters
# look up mime multi part
# make hard limit even if user input exceeds it (for stability)
# turn all text into unicode


if __name__ == '__main__':
    # Use the DebugToolbar
    DebugToolbarExtension(app)

    # Connect DB to Flask before running app
    connect_to_db(app)

    app.run(host='0.0.0.0', port=5000, debug=True)
