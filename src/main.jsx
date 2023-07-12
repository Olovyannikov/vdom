import {render, VDom} from "@/jsx";
import {App} from "./App.jsx";

import {api, stream} from "./helpers.js";

import {store} from "./store/index.js";

import {changeLotPrice, setLots} from "./store/auction/actions.js";

export function renderView(state) {
    render(
        <App state={state}/>,
        document.getElementById('root')
    )
}

renderView(store.getState());
store.subscribe(() => {
    renderView(store.getState())
});

// ####
api.get('/lots').then((lots) => {
    store.dispatch(setLots(lots));

    lots.forEach((lot) => {
        stream.subscribe(`price-${lot.id}`, (data) => {
            store.dispatch(changeLotPrice(data.id, data.price));
        })
    })
});
