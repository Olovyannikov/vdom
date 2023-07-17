import {VDom} from "@/jsx";

import {connect} from "../../store/connect.jsx";
import {Lots} from "../Lots/index.jsx";

const lotsMapStateToProps = (state) => ({
    lots: state?.auction.lots
});

export const LotsWrapper = connect(lotsMapStateToProps, null)(Lots);