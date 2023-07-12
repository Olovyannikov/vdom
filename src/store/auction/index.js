import {AUCTION_ACTION_TYPE} from "./types.js";

const auctionInitialState = {
    lots: null,
}

export const auctionReducer = (state = auctionInitialState, action) => {
    switch (action.type) {
        case AUCTION_ACTION_TYPE.SET_LOTS:
            return {
                ...state, lots: action.lots
            }
        case AUCTION_ACTION_TYPE.CHANGE_LOT_PRICE:
            return {
                ...state,
                lots: state.lots.map(lot => {
                    if (lot.id === action.id) {
                        return {
                            ...lot,
                            price: action.price
                        }
                    }
                    return lot;
                })
            }
        default:
            return state
    }
}