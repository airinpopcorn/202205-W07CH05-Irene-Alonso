import { iRobot } from "../models/robot";
import { robotReducer } from "../reducers/robot/robot.reducer";
import { configureStore } from "@reduxjs/toolkit";

export interface iState {
  robots: Array<iRobot>;
}

const preloadedState = {
  robot: [],
};

export const store = configureStore({
  reducer: {
    robot: robotReducer,
  },
  preloadedState,
});
