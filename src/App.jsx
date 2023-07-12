import {VDom} from './jsx-runtime';

import {Header} from './components/Header';
import {Clock} from './components/Clock';
import {Lots} from './components/Lots';

export function App ({ state }) {
    return (
        <div className='app'>
            <Header/>
            <Clock time={state.clock.time}/>
            <Lots lots={state.auction.lots}/>
        </div>
    )
}