import { applyMiddleware, combineReducers, createStore } from "redux";
import companiesReducer from "./companiesReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
    companies: companiesReducer,
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;