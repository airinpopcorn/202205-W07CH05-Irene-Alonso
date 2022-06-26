import { AnyAction } from "@reduxjs/toolkit";
import { iRobot } from "../../models/robot";
import * as ac from "./actions.creators";
import { robotReducer } from "./robot.reducer";

describe("Given textil Reducer", () => {
  const mockRobots = [
    {
      id: "1",
      name: "testName",
      image: "imageTest",
      speed: 2,
      life: 13,
      dateEst: "date",
    },
    {
      id: "2",
      name: "testName2",
      image: "imageTest2",
      speed: 3,
      life: 10,
      dateEst: "date2",
    },
  ];
  describe("When we call it with load action", () => {
    test("Then it should return the array mockTextil", () => {
      //Arrange
      const initialState: Array<iRobot> = [];
      const actionTest = ac.loadRobot(mockRobots);
      //Act
      const newState = robotReducer(initialState, actionTest);
      //Assert
      expect(newState).toEqual(mockRobots);
      expect(newState).toHaveLength(2);
    });
  });
  describe("When we call it with add action", () => {
    test("Then it should return an array lenght 2", () => {
      //Arrange
      const initilState: Array<iRobot> = mockRobots;
      const actionTest = ac.addRobot({
        id: "3",
        name: "testRobot",
        image: "robot.jpg",
        speed: 10,
        life: 2,
        dateEst: "2/10/05",
      });
      //Act
      const newState = robotReducer(initilState, actionTest);
      //Assert
      expect(newState).toHaveLength(3);
    });
  });
  describe("When we call it with update action", () => {
    test("Then it should return the array modified", () => {
      //Arrange
      const initialState = mockRobots;
      const actionTest = ac.updateRobot({ ...mockRobots[0], speed: 11 });
      //Act
      const newState = robotReducer(initialState, actionTest);
      //Assert
      expect(newState[0].speed).toEqual(11);
    });
  });
  describe("When we call it with delete action", () => {
    test("Then it should return an empty array", () => {
      //Assert
      const initialState = mockRobots;
      const actionTest = ac.deleteRobot(mockRobots[0]);
      //Act
      const newState = robotReducer(initialState, actionTest);
      //Assert
      expect(newState).toHaveLength(1);
    });
  });
  describe("When we call it with none existing action type", () => {
    test("Then it should return de state", () => {
      //Arrange
      const initialState = mockRobots;
      const actionTest = {} as AnyAction;
      //Act
      const newState = robotReducer(initialState, actionTest);
      //Assert
      expect(newState).toEqual(initialState);
    });
  });
});
