import { createAction } from "redux-actions";
import * as actionTypes from "./actionTypes";

export const changeDateAsync = createAction(actionTypes.DATE_CHANGED);