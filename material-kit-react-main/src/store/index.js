import userReducer from "../reducers/user-reducer"
import itemReducer from "../reducers/item-reducer"
import { createStore, applyMiddleware, combineReducers,compose  } from "redux";
import thunk from "redux-thunk";
const initialState = {};

const reducers = combineReducers({
    userReducer: userReducer,
    itemReducer: itemReducer
});

const middleware = [thunk];

const store = createStore(reducers, initialState, applyMiddleware(...middleware));

export default store;
