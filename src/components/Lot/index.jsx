import {VDom} from "@/jsx";

export function Lot ({ lot }) {
    return (
        <article className='lot'>
            <div className="price">{lot.price}</div>
            <h2>{lot.name}</h2>
            <p>{lot.description}</p>
        </article>
    )
}
