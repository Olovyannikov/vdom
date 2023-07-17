import {VDom} from "@/jsx";
import {api} from "../../helpers.js";
import {favoriteLot, unfavoriteLot} from "../../store/auction/actions.js";

import {Lot} from "../Lot/index.jsx";
import {connect} from "../../store/connect.jsx";

const lotMapDispatchToProps = (dispatch) => ({
    fav: (id) => {
        api.post(`/lots/${id}/favorite`).then(() => dispatch(favoriteLot(id)))
    },
    unfav: (id) => {
        api.post(`/lots/${id}/unfavorite`).then(() => dispatch(unfavoriteLot(id)))
    }
})
export const LotWrapper = connect(null, lotMapDispatchToProps)(Lot);
