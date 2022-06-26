import { iRobot } from "../models/robot";
import { robotReducer } from "../reducers/robot/robot.reducer";
import { configureStore } from "@reduxjs/toolkit";

export interface iState {
  textils: Array<iRobot>;
}

const preloadedState = {
  textil: [],
};

export const store = configureStore({
  reducer: {
    textil: robotReducer,
  },
  preloadedState,
});
