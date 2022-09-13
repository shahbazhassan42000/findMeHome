import {createSlice} from "@reduxjs/toolkit";
import {apiCallBegan} from "../actions";
import {allBreedsURL, allDiseasesURL, backendURL, getUserURL} from "../../utils/EndPoints";
// import {forEach} from "lodash";


// const user = JSON.parse(localStorage.getItem('user'));

const dogSlice = createSlice({
    name: "Dog",
    initialState: {
        dog: {name: "", breed: "", image: "", age: ""},
        breeds:[],
        diseases:[],
        user:null
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
        breedsReceived(state,action){
            console.log("BREEDS RECEIVED");
            state.breeds=action.payload;
        },
        diseasesReceived(state,action){
            console.log("DISEASES RECEIVED");
            state.diseases=action.payload;
        },
        userReceived(state,action){
            console.log("USER RECEIVED");
            state.user=action.payload;
        }
    }
});

const {
    breedResult,
    breedsReceived,
    diseasesReceived,
    userReceived
} = dogSlice.actions;
export default dogSlice.reducer;
export {breedResult};

//api data
export const headers = {
    "Content-type": "application/json;charset=UTF-8",
    "authorization": `Bearer ${localStorage.getItem('token')}`
};

//action creators

export const loadBreeds=()=>apiCallBegan({
    url:backendURL+allBreedsURL,
    headers,
    onSuccess:breedsReceived.type
})
export const loadDiseases=()=>apiCallBegan({
    url:backendURL+allDiseasesURL,
    headers,
    onSuccess:diseasesReceived.type
})

export const loadUser=(user)=>apiCallBegan({
    url:backendURL+getUserURL,
    headers,
    method:'POST',
    data:JSON.stringify(user),
    onSuccess:userReceived.type
})
