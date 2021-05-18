import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterReducer from "./clients/filterReducer/filterReduser";
import clientsReducer from "./clients/clientsReducer/clientsReducer";

const rootReducer = combineReducers({
  items: clientsReducer,
  filter: filterReducer,
});

const store = configureStore({
  reducer: {
    contacts: rootReducer,
  },
});

export default store;
