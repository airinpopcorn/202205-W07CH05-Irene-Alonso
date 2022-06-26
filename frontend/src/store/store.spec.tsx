import { store } from "./store";

describe("Given the store", () => {
  describe("When we imported it", () => {
    test("Then it should give you an object", () => {
      expect(store).toBeTruthy();
    });
  });
});
