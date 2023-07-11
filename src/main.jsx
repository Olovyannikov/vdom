import {render, VDom} from "@/jsx";
import {App} from "./App.jsx";
import {store} from "./store/index.js";

export function renderView (state) {
    render(
        App({ state }),
        document.getElementById('root')
    )
}

renderView(store.getState());
store.subscribe(() => {
    renderView(store.getState())
});