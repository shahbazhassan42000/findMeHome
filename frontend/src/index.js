import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "@fontsource/montserrat";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Provider} from "react-redux";
import {persistor,store} from "./store/dogs/store";
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
