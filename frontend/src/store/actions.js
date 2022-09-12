import {createAction} from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/CallBegan");
export const apiCallSuccess = createAction("api/CallSuccess");
export const apiCallFailed = createAction("api/CallFailed");

