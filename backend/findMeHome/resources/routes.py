from backend.findMeHome.resources.resources import SignUpApi, ModelApi, SignInApi, DogApi, GetBreedsApi, \
    GetDiseasesApi

# baseUrl = 'http://127.0.0.1:5000'
signUpURL = '/api/v0.1/user'
modelURL = "/api/dog_model"
signInURL = '/api/v0.1/userLogin'
dogApiURL = '/api/v0.1/dogApi'
getBreedsURL = '/api/v0.1/getBreedsApi'
getDiseasesURL = '/api/v0.1/getDiseases'


def initialize_routes(api):
    api.add_resource(SignUpApi, signUpURL)
    api.add_resource(ModelApi, modelURL)
    api.add_resource(SignInApi, signInURL)
    api.add_resource(DogApi, dogApiURL)
    api.add_resource(GetBreedsApi, getBreedsURL)
    api.add_resource(GetDiseasesApi, getDiseasesURL)
