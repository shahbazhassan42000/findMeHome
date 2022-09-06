import axios from "axios";
import * as actions from "../actions"
export const baseURL = "http://localhost:5000";

const api = ({dispatch}) => next => action => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    next(action);
    const {url, method, data, onSuccess, onError, headers} = action.payload;
    axios.request({
        baseURL,
        url,
        method,
        headers,
        data
    }).then((response) => {
        dispatch(actions.apiCallSuccess(response.data));
        if (onSuccess) dispatch({type: onSuccess, payload: response.data});
    }).catch((err) => {
        dispatch(actions.apiCallFailed(err.message));
        if (onError) dispatch({type: onError, payload: err.message});
    });
}

export default api;