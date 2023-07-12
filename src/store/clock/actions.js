import {CLOCK_ACTION_TYPE} from "./types.js";
export const setTime = (time) => ({
    type: CLOCK_ACTION_TYPE.SET_TIME,
    time
});