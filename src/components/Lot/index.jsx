import {VDom} from "@/jsx";
import {Favorite} from "../Favorite/index.jsx";
import {isFav} from "../../helpers.js";

export function Lot ({ lot, fav, unfav }) {
    return (
        <article className={`lot ${lot?.favorite ? 'favorite' : ''}`}>
            <div className="price">{lot?.price}</div>
            <h2>{lot?.name}</h2>
            <p>{lot?.description}</p>
            <Favorite
                id={lot?.id}
                isActive={isFav(lot)}
                fav={() => fav(lot?.id)}
                unfav={() => unfav(lot?.id)}
            />
        </article>
    )
}
