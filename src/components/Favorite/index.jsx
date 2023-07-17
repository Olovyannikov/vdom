import {VDom} from "@/jsx";
import {addOnClick} from "../../utils/registerEvents.js";

export const Favorite = ({isActive, id, fav, unfav}) => {

    addOnClick(id + 'fav', fav);
    addOnClick(id + 'unfav', unfav);

    return isActive ?
            <button id={id + 'unfav'} className='unfavorite' type='button'>
                <ion-icon name='heart-sharp' />Unfavorite
            </button> :
            <button id={id + 'fav'} className='favorite' type="button">
                <ion-icon name='heart-outline'/>Favorite
            </button>
}
