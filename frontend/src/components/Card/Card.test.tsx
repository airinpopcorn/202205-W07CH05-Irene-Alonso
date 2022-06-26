import { BrowserRouter } from "react-router-dom";
import { iRobot } from "../../models/robot";
import { robotReducer } from "../../reducers/robot/robot.reducer";
import { iState } from "../../store/store";
import { CardRobot } from "./Card";
import { render, screen } from "../../utils/test-utils";

//Para hacer test el handler del botón borrar
// jest.mock("react-redux", () => ({
//   ...jest.requireActual("react-redux"),
//   useDispatch: jest.fn(),
// }));

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
      render(
        <BrowserRouter>
          <CardRobot robot={mockItem} />
        </BrowserRouter>,
        { preloadedState, reducer }
      );

      const result = screen.getByText(/testRobot/i);
      expect(result).toBeInTheDocument();
    });
  });
});
