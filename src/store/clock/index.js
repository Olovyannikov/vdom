import {CLOCK_ACTION_TYPE} from "./types.js";

const clockInitialState = {
    time: new Date(),
}
export const clockReducer = (state = clockInitialState, action) => {
    switch (action.type) {
        case CLOCK_ACTION_TYPE.SET_TIME:
            return {
                ...state, time: action.time
            }
        default:
            return state
    }
}