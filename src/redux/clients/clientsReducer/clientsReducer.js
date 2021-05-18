import { createReducer } from "@reduxjs/toolkit";
import { addALLClients, addClient, deleteClient } from "./clientsAction";

const itemsReduser = createReducer([], {
  [addALLClients]: (_, { payload }) => payload,
  [addClient]: (state, { payload }) => [...state, payload],
  [deleteClient]: (state, { payload }) => [
    ...state.filter((el) => el.id !== payload),
  ],
});

export default itemsReduser;
