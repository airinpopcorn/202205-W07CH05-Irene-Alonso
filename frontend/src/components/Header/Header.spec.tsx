import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../../pages/home";
import { Header } from "./Header";

jest.mock("../../pages/home");

describe("Given Header function", () => {
  const mockOptions = [
    { path: "", label: "Home", page: <HomePage></HomePage> },
  ];
  describe("When we call it", () => {
    test("Then it should render", () => {
      (HomePage as jest.Mock).mockResolvedValue(<h2>ROBOTS</h2>);
      render(
        <MemoryRouter>
          <Header options={mockOptions}></Header>
        </MemoryRouter>
      );

      expect(screen.getByText("Home")).toBeInTheDocument();
    });
  });
});
