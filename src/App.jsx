import {VDom} from '@/jsx';

import {Header} from './components/Header';
import {ClockWrapper} from "./components/ClockWrapper/index.jsx";
import {LotsWrapper} from "./components/LotsWrapper/index.jsx";

export function App () {
    return (
        <div className='app'>
            <Header/>
            <ClockWrapper />
            <LotsWrapper />
        </div>
    )
}