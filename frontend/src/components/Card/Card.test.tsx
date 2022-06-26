import { BrowserRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import { iRobot } from "../../models/robot";
import { robotReducer } from "../../reducers/robot/robot.reducer";
import { iState } from "../../store/store";
import { CardRobot } from "./Card";
import { render } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { HttpStoreRobots } from "../../services/http.store.robot";

jest.mock("../../services/http.store.robot");

describe("Given Card component", () => {
  const mockItem: iRobot = {
    _id: "",
    name: "testRobot",
    image: "img.jpg",
    speed: 1,
    life: 2,
    dateEst: "",
  };
  const reducer = {
    robots: robotReducer,
  };
  describe("When calling it with a robot object", () => {
    test("Then it should render a card with data", () => {
      const preloadedState: iState = {
        robots: [] as Array<iRobot>,
      };
      const mockDelete = jest.fn();
      mockDelete.mockResolvedValue({});
      HttpStoreRobots.prototype.deleteRobot = mockDelete;
      render(
        <BrowserRouter>
          <CardRobot robot={mockItem} />
        </BrowserRouter>,
        { preloadedState, reducer }
      );

      const result = screen.getByText(/testRobot/i);
      expect(result).toBeInTheDocument();
      userEvent.click(screen.getByText(/Borrar/i));
      expect(mockDelete).toHaveBeenCalled();
    });
  });
});
