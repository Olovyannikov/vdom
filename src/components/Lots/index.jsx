import {VDom} from "@/jsx";
import {Loading} from "../Loading/index.jsx";
import {Lot} from "../Lot/index.jsx";

export function Lots ({ lots }) {
    if (lots === null) {
        <Loading/>
    }

    return (
        <div className="lots">
            {lots?.map((lot) => <Lot lot={lot} key={lot.id}/>)}
        </div>
    )
}