import { iRobot } from "../models/robot";
import { robotReducer } from "../reducers/robot/robot.reducer";
import { configureStore } from "@reduxjs/toolkit";

export interface iState {
  robots: Array<iRobot>;
}

const preloadedState = {
  robots: [] as Array<iRobot>,
};

export const store = configureStore({
  reducer: {
    robots: robotReducer,
  },
  preloadedState,
});
