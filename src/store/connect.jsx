import {VDom} from "@/jsx";
import {StoreContext} from "../context/StoreContext.js";
import {renderView} from "../main.jsx";

export function connect(mapStateToProps, mapDispatchToProps) {
    return WrappedComponent => {
        return (props) => {
            return (
                <StoreContext.Consumer>
                    {(store) => {

                        const state = store.getState();
                        const dispatch = store.dispatch;
                        const stateToProps = mapStateToProps ? mapStateToProps(state) : {};
                        const dispatchToProps = mapDispatchToProps ? mapDispatchToProps(dispatch) : {};

                        return (
                            <WrappedComponent
                                {...props}
                                {...stateToProps}
                                {...dispatchToProps}
                            />
                        )
                    }}
                </StoreContext.Consumer>
            )
        }
    }
}