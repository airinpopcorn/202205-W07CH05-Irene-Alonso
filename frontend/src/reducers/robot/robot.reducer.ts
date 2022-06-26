import { createReducer } from "@reduxjs/toolkit";
import { iRobot } from "../../models/robot";
import * as ac from "./actions.creators";

const initialState: Array<iRobot> = [];

export const robotReducer = createReducer(initialState, (builder) => {
  return builder
    .addCase(ac.loadRobot, (state, action) => [...action.payload])
    .addCase(ac.addRobot, (state, action) => [...state, action.payload])
    .addCase(ac.updateRobot, (state, action) =>
      state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      )
    )
    .addCase(ac.deleteRobot, (state, action) =>
      state.filter((item) => item._id !== action.payload._id)
    )
    .addDefaultCase((state) => state);
});
