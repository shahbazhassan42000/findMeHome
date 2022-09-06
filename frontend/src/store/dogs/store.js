import {configureStore} from "@reduxjs/toolkit";
import dogReducer from './dogSlice';
import api from "../middleware/api";
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import thunk from 'redux-thunk';
// import {user} from "../../App";

const persistConfig = {
    key: 'dog',
    storage:storageSession,
    whitelist: ['dog']
}

const persistedReducer = persistReducer(persistConfig, dogReducer)

export const store = configureStore({
    reducer: {
        dogStore: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk,api],

});

export const persistor = persistStore(store)


// if (user) store.dispatch(loadBoards(user))
