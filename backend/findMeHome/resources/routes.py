from backend.findMeHome.resources.resources import signUpApi, ModelApi, signInApi,dogApi

# baseUrl = 'http://127.0.0.1:5000'
signUpURL = '/api/v0.1/user'
modelURL = "/api/dog_model"
signInURL = '/api/v0.1/userLogin'
dogApiURL = '/api/v0.1/dogApi'

def initialize_routes(api):
    api.add_resource(signUpApi, signUpURL)
    api.add_resource(ModelApi, modelURL)
    api.add_resource(signInApi,signInURL)
    api.add_resource(dogApi,dogApiURL)
