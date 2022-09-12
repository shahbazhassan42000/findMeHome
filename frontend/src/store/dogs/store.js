import {configureStore} from "@reduxjs/toolkit";
import dogReducer, {loadBreeds, loadDiseases, loadUser} from './dogSlice';
import api from "../middleware/api";
import {persistReducer, persistStore} from 'redux-persist';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import thunk from 'redux-thunk';
const username=localStorage.getItem("username");
console.log(username);


const persistConfig = {
    key: 'dog',
    storage: storageSession,
    whitelist: ['dog', 'breeds', 'diseases','user']
}

const persistedReducer = persistReducer(persistConfig, dogReducer)

export const store = configureStore({
    reducer: {
        dogStore: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk, api],

});

export const persistor = persistStore(store)

if(username) store.dispatch(loadUser({user:{username}}))

// store.dispatch(loadBreeds());
// store.dispatch(loadDiseases());
