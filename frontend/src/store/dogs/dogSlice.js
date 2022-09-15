import {createSlice} from "@reduxjs/toolkit";
import {apiCallBegan} from "../actions";
import {
    allBreedsURL,
    allDiseasesURL,
    backendURL,
    getFeaturedDogs,
    getShelterURL,
    getUserURL
} from "../../utils/EndPoints";
// import {forEach} from "lodash";



const dogSlice = createSlice({
    name: "Dog",
    initialState: {
        dog: {name: "", breed: "", image: "", age: ""},
        breeds: [],
        ages: [['Young','0–2 years'],['Adult','2–5 years'],['Senior','>6 years']],
        diseases: [],
        user: null,
        featuredDogs:[],
        shelter:null
    },
    reducers: {
        breedResult(state, action) {
            console.log("BREED RESULT");
            const {name, breed, image, age} = action.payload;
            if (name) state.dog.name = name;
            if (breed) state.dog.breed = breed;
            if (image) state.dog.image = image;
            if (age) state.dog.age = age;
        },
        breedsReceived(state, action) {
            console.log("BREEDS RECEIVED");
            state.breeds = action.payload;
        },
        diseasesReceived(state, action) {
            console.log("DISEASES RECEIVED");
            state.diseases = action.payload;
        },
        userReceived(state, action) {
            console.log("USER RECEIVED");
            state.user = action.payload;
        },
        featuredDogsReceived(state,action){
            console.log("FEATURED DOGS RECEIVED")
            state.featuredDogs=action.payload
        },
        shelterReceived(state,action){
            console.log("SHELTER RECEIVED");
            state.shelter=action.payload;
        }
    }
});

const {
    breedResult,
    breedsReceived,
    diseasesReceived,
    userReceived,
    featuredDogsReceived,
    shelterReceived
} = dogSlice.actions;
export default dogSlice.reducer;
export {breedResult, userReceived};

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

export const loadFeaturedDogs=()=>apiCallBegan({
    url:backendURL+getFeaturedDogs,
    headers,
    method: 'POST',
    onSuccess:featuredDogsReceived.type
})

export const loadShelter=()=>apiCallBegan({
    url:backendURL+getShelterURL,
    headers,
    method:"POST",
    onSuccess: shelterReceived.type
})
