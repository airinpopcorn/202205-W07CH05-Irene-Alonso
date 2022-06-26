import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { HttpStoreRobots } from "../../services/http.store.robot";
import { iRobot } from "../../models/robot";

jest.mock("../../services/http.store.robot");

test("renders learn react link", () => {
  const mockRobots: Array<iRobot> = [
    {
      _id: "",
      name: "testRobot",
      image: "img.jpg",
      speed: 1,
      life: 2,
      dateEst: "",
    },
    {
      _id: "",
      name: "testRobot2",
      image: "img2.jpg",
      speed: 14,
      life: 5,
      dateEst: "",
    },
  ];
  const mockLoad = jest.fn();
  mockLoad.mockResolvedValue(mockRobots);
  HttpStoreRobots.prototype.getAllRobots = mockLoad;
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  const element = screen.getByText(/ROBOT PARTY/i);
  expect(element).toBeInTheDocument();
  expect(mockLoad).toHaveBeenCalled();
});
