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
// import {forEach} from "lodash";


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
        featuredDogsReceived(state, action) {
            console.log("FEATURED DOGS RECEIVED")
            state.featuredDogs = action.payload
        },
        shelterReceived(state, action) {
            console.log("SHELTER RECEIVED");
            state.shelter = action.payload;
        },
        dogsReceived(state,action){
            console.log("DOGS RECEIVED");
            state.dogs=action.payload;
        },
        dogDiseasesReceived(state,action){
            console.log("DOG DISEASES RECEIVED");
            const objs=action.payload;
            const diseases=[];
            map(objs,obj=>{
                diseases.push(state.diseases[obj.disid].dname);
            })
            state.dogDiseases=diseases;
        },dogInfoReceived(state,action){
            console.log("DOG INFO RECEIVED");
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


