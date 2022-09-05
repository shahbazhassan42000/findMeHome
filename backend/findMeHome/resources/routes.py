from backend.findMeHome.resources.resources import AdapterApi, ModelApi

# baseUrl = 'http://127.0.0.1:5000'
signUpURL = '/api/v0.1/user'
modelURL = "/api/dog_model"


def initialize_routes(api):
    api.add_resource(AdapterApi, signUpURL)
    api.add_resource(ModelApi, modelURL)
