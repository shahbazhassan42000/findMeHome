import {createSlice} from "@reduxjs/toolkit";
import {apiCallBegan} from "../actions";
import {
    allBreedsURL,
    allDiseasesURL,
    backendURL, dogApiURL,
    getFeaturedDogsURL, getShelterDogsURL,
    getShelterURL,
    getUserURL
} from "../../utils/EndPoints";
import {map} from "lodash";

const dogSlice = createSlice({
    name: "Dog",
    initialState: {
        dog: {name: "", breed: "", image: "", age: ""},
        breeds: [],
        ages: [['Young', '0–2 years'], ['Adult', '2–5 years'], ['Senior', '>6 years']],
        diseases: [],
        user: null,
        featuredDogs: [],
        shelter: null,
        dogs:[],
        dogDiseases:[],
        dogInfo:{},
    },
    reducers: {
        breedResult(state, action) {
            const {name, breed, image, age} = action.payload;
            if (name) state.dog.name = name;
            if (breed) state.dog.breed = breed;
            if (image) state.dog.image = image;
            if (age) state.dog.age = age;
        },
        breedsReceived(state, action) {
            state.breeds = action.payload;
        },
        diseasesReceived(state, action) {
            state.diseases = action.payload;
        },
        userReceived(state, action) {
            state.user = action.payload;
        },
        featuredDogsReceived(state, action) {
            state.featuredDogs = action.payload
        },
        shelterReceived(state, action) {
            state.shelter = action.payload;
        },
        dogsReceived(state,action){
            state.dogs=action.payload;
        },
        dogDiseasesReceived(state,action){
            const objs=action.payload;
            const diseases=[];
            map(objs,obj=>{
                diseases.push(state.diseases[obj.disid].dname);
            })
            state.dogDiseases=diseases;
        },dogInfoReceived(state,action){
            state.dogInfo=action.payload;
        }
    }
});

const {
    breedResult,
    breedsReceived,
    diseasesReceived,
    userReceived,
    featuredDogsReceived,
    shelterReceived,
    dogsReceived,
    dogDiseasesReceived,
    dogInfoReceived
} = dogSlice.actions;
export default dogSlice.reducer;
export {breedResult, userReceived,dogInfoReceived};

//api data
export const headers = {
    "Content-type": "application/json;charset=UTF-8",
    "Authorization": `Bearer ${localStorage.getItem('token')}`
};

//action creators

export const loadBreeds = () => apiCallBegan({
    url: backendURL + allBreedsURL,
    headers,
    onSuccess: breedsReceived.type
})
export const loadDiseases = () => apiCallBegan({
    url: backendURL + allDiseasesURL,
    headers,
    onSuccess: diseasesReceived.type
})

export const loadUser = (user) => apiCallBegan({
    url: backendURL + getUserURL,
    headers,
    method: 'POST',
    onSuccess: userReceived.type
})

export const loadFeaturedDogs = () => apiCallBegan({
    url: backendURL + getFeaturedDogsURL,
    headers,
    method: 'POST',
    onSuccess: featuredDogsReceived.type
})

export const loadShelter = (sid) => apiCallBegan({
    url: backendURL + getShelterURL,
    headers,
    method: "POST",
    data: {"sid": JSON.stringify(sid)},
    onSuccess: shelterReceived.type
})

export const loadShelterDogs=()=>apiCallBegan({
    url:backendURL+getShelterDogsURL,
    headers,
    method:"POST",
    onSuccess:dogsReceived.type
})
export const loadDogs=()=>apiCallBegan({
    url:backendURL+dogApiURL,
    headers,
    method:"GET",
    onSuccess:dogsReceived.type
})

export const deleteDog=(dogID)=>apiCallBegan({
    url:backendURL+dogApiURL,
    headers,
    method:"DELETE",
    data:JSON.stringify(dogID)
})

export const loadDogDiseases=(dogID)=>apiCallBegan({
    url:backendURL+allDiseasesURL,
    headers,
    method:"POST",
    data:JSON.stringify(dogID),
    onSuccess:dogDiseasesReceived.type
})


