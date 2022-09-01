
from backend.findMeHome.resources.resources import AdapterApi

# baseUrl = 'http://127.0.0.1:5000'
signUpUrl = '/api/v0.1/user'



def initialize_routes(api):
    api.add_resource(AdapterApi,signUpUrl)
