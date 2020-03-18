import companiesReducer from "./companiesReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  companies: companiesReducer
});
export default rootReducer;
