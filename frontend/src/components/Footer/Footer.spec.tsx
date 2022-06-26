import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Given Footer function", () => {
  describe("When we call it", () => {
    test("Then it should render", () => {
      render(<Footer></Footer>);
      expect(screen.getByText("Irene - ISDICoders")).toBeInTheDocument();
    });
  });
});
