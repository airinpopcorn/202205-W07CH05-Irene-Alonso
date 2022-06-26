import { iRobot } from "../../models/robot";
import { actionTypes } from "./action.types";
import { createAction } from "@reduxjs/toolkit";

export const loadRobot = createAction<Array<iRobot>>(actionTypes["robot@load"]);

export const addRobot = createAction<iRobot>(actionTypes["robot@add"]);

export const updateRobot = createAction<iRobot>(actionTypes["robot@update"]);

export const deleteRobot = createAction<iRobot>(actionTypes["robot@delete"]);
