from backend.findMeHome.resources.resources import SignUpApi, ModelApi, SignInApi, \
    DogApi, BreedsApi, DiseasesApi, UsersApi

# baseUrl = 'http://127.0.0.1:5000'
signUpURL = '/api/v0.1/usersignup'
modelURL = "/api/dog_model"
signInURL = '/api/v0.1/userLogin'
dogApiURL = '/api/v0.1/dogApi'
getAllBreedsURL = '/api/v0.1/breeds'
getAllDiseasesURL = '/api/v0.1/diseases'
userApiUrl = '/api/v0.1/user'


def initialize_routes(api):
    api.add_resource(SignUpApi, signUpURL)
    api.add_resource(ModelApi, modelURL)
    api.add_resource(SignInApi, signInURL)
    api.add_resource(DogApi, dogApiURL)
    api.add_resource(BreedsApi, getAllBreedsURL)
    api.add_resource(DiseasesApi, getAllDiseasesURL)
    api.add_resource(UsersApi, userApiUrl)
