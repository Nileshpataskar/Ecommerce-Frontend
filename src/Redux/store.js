import { createStore, combineReducers } from "redux";
import cartReducer from "./reducer/cartReducer";
import tempDataReducer from "./reducer/tempDataReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  
  tempData: tempDataReducer,
});

const store = createStore(rootReducer);

export default store;
