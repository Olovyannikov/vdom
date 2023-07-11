import {api, stream} from "../helpers.js";

const initialState = {
    time: new Date(),
    lots: null,
}

class Store {
    constructor(initialState) {
        this.state = initialState;
        this.listeners = [];
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    getState() {
        return this.state;
    }

    changeState(diff){
        this.state = {
            ...this.state,
            ...(typeof diff === 'function' ? diff(this.state) : diff)
        };

        this.listeners.forEach(listener => {
            listener();
        })
    }
}

const store = new Store(initialState);

api.get('/lots').then((lots) => {
    store.changeState({lots})

    const onPrice = (data) => {
        store.changeState(state =>({
            lots: state.lots.map((lot) => {
                if (lot.id === data.id) {
                    return {
                        ...lot,
                        price: data.price
                    }
                }
                return lot
            })
        }));
    }

    lots.forEach((lot) => {
        stream.subscribe(`price-${lot.id}`, onPrice)
    })
});

setInterval(() => {
    store.changeState({
        time: new Date()
    });
}, 1000)


export {store};