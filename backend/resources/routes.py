from backend.resources.resources import SignUpApi, ModelApi, SignInApi, DogApi, BreedsApi, DiseasesApi, UsersApi, ShelterDogsApi, \
    FeaturedDogsApi, ShelterPage

signUpURL = '/api/v0.1/usersignup'
modelURL = "/api/dog_model"
signInURL = '/api/v0.1/userLogin'
dogApiURL = '/api/v0.1/dogApi'
getAllBreedsURL = '/api/v0.1/breeds'
getAllDiseasesURL = '/api/v0.1/diseases'
userApiUrl = '/api/v0.1/user'
ShelterDogsApiURL = '/api/v0.1/shelterdogs'
FeaturedDogsApiURL = '/api/v0.1/featureddogs'
getShelterPageURL = '/api/v0.1/getshelterpage'


def initialize_routes(api):
    api.add_resource(SignUpApi, signUpURL)
    api.add_resource(ModelApi, modelURL)
    api.add_resource(SignInApi, signInURL)
    api.add_resource(DogApi, dogApiURL)
    api.add_resource(BreedsApi, getAllBreedsURL)
    api.add_resource(DiseasesApi, getAllDiseasesURL)
    api.add_resource(UsersApi, userApiUrl)
    api.add_resource(ShelterDogsApi, ShelterDogsApiURL)
    api.add_resource(FeaturedDogsApi, FeaturedDogsApiURL)
    api.add_resource(ShelterPage, getShelterPageURL)
