import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { iRobot } from "../../models/robot";
import { robotReducer } from "../../reducers/robot/robot.reducer";
import { iState } from "../../store/store";
import { render } from "../../utils/test-utils";
import { List } from "./List";

describe("Given List component", () => {
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
  const reducer = {
    robots: robotReducer,
  };
  describe("When we call the function", () => {
    test("Then it should render a list of items", () => {
      const preloadedState: iState = {
        robots: [] as Array<iRobot>,
      };
      render(
        <BrowserRouter>
          <List robots={mockRobots} />
        </BrowserRouter>,
        { preloadedState, reducer }
      );

      const result = screen.getByAltText("Robot testRobot");
      expect(result).toBeInTheDocument();
    });
  });
});
