import {render, VDom} from "@/jsx";
import {App} from "./App.jsx";

import {api, stream} from "./helpers.js";

import {store} from "./store/index.js";

import {StoreContext} from "./context/StoreContext.js";
import {changeLotPrice, setLots} from "./store/auction/actions.js";
import {setTime} from "./store/clock/actions.js";

export function renderView() {
    render(
        <StoreContext.Provider value={store}>
            <App/>
        </StoreContext.Provider>,
        document.getElementById('root')
    );
}

store.subscribe(() => {
    renderView()
})

renderView()


// ####
api.get('/lots').then((lots) => {
    store.dispatch(setLots(lots));

    lots.forEach((lot) => {
        stream.subscribe(`price-${lot.id}`, (data) => {
            store.dispatch(changeLotPrice(data.id, data.price));
        })
    })
});

setInterval(() => {
    store.dispatch(setTime(new Date()))
}, 1000)