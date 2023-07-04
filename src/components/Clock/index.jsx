import {VDom} from "@/jsx";

export function Clock ({ time }) {
    const isDay = time.getHours() >= 7 && time.getHours() <= 21;

    return (
        <div className='clock'>
            <span className='value'>{time.toLocaleTimeString()}</span>
            <span className={isDay ? 'icon day' : 'icon night'}/>
        </div>
    )
}