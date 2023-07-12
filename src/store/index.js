import {clockReducer} from "./clock";
import {auctionReducer} from "./auction";
class Store {
    constructor(reducer, initialState) {
        this.reducer = reducer;
        this.state = reducer(initialState, {type: null});
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);

        return () => {
            const idx = this.listeners.indexOf(listener);
            this.listeners.splice(idx, 1);
        }
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach(listener => listener());
    }

    getState() {
        return this.state;
    }
}

function combineReducers(reducers) {
    return (state = {}, action) => {
        const result = {};
        Object.entries(reducers).forEach(([key, reducer]) => {
            result[key] = reducer(state[key], action);
        });

        return result;
    }
}
export const store = new Store(combineReducers({
    clock: clockReducer,
    auction: auctionReducer
}));