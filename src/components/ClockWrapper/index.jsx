import {VDom} from "@/jsx";
import {Clock} from "../Clock/index.jsx";
import {connect} from "../../store/connect.jsx";

const clockMapStateToProps = (state) => ({
    time: state.clock.time
});

export const ClockWrapper = connect(clockMapStateToProps)(Clock)