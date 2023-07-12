import {AUCTION_ACTION_TYPE} from "./types.js";

export const setLots = (lots) => ({
    type: AUCTION_ACTION_TYPE.SET_LOTS,
    lots
});

export const changeLotPrice = (id, price) => ({
    type: AUCTION_ACTION_TYPE.CHANGE_LOT_PRICE,
    id,
    price
});