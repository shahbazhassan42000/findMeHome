import {configureStore} from "@reduxjs/toolkit";
import dogReducer, {loadBreeds, loadDiseases, loadDogs, loadFeaturedDogs, loadShelterDogs, loadUser} from './dogSlice';
import api from "../middleware/api";
import {persistReducer, persistStore} from 'redux-persist';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import thunk from 'redux-thunk';

const token = localStorage.getItem("token");


const persistConfig = {
    key: 'dog',
    storage: storageSession,
    whitelist: ['dog', 'breeds', 'ages', 'diseases', 'user', 'shelter','dogDiseases','dogInfo']
}

const persistedReducer = persistReducer(persistConfig, dogReducer)

export const store = configureStore({
    reducer: {
        dogStore: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk, api],

});

export const persistor = persistStore(store)

if (token) {
    store.dispatch(loadUser())
    store.dispatch(loadShelterDogs())
    store.dispatch(loadDogs())
}


store.dispatch(loadBreeds());
store.dispatch(loadDiseases());
store.dispatch(loadFeaturedDogs())
