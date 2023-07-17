import {VDom} from "@/jsx";
import {Loading} from "../Loading/index.jsx";
import {LotWrapper} from "../LotWrapper/index.jsx";

export function Lots ({ lots }) {
    if (!lots) {
        return <Loading/>
    }

    return (
        <div className="lots">
            {lots?.map((lot) => <LotWrapper lot={lot} key={lot.id}/>)}
        </div>
    )
}