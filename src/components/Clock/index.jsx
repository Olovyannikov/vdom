import {VDom} from "@/jsx";
import {store} from "../../store/index.js";
import {setTime} from "../../store/clock/actions.js";

export function Clock ({ time }) {
    const isDay = time.getHours() >= 7 && time.getHours() <= 21;

    setInterval(() => {
        store.dispatch(setTime(new Date()))
    }, 1000);

    return (
        <div className='clock'>
            <span className='value'>{time.toLocaleTimeString()}</span>
            <span className={isDay ? 'icon day' : 'icon night'}/>
        </div>
    )
}