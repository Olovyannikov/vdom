import {render, VDom} from "@/jsx";
import {App} from "./App.jsx";
import {state} from "./store/index.js";

export function renderView (state) {
    render(
        App({ state }),
        document.getElementById('root')
    )
}

renderView(state);