import { HttpStoreRobots } from "./http.store.robot";

const resp = [
  {
    _id: "1",
    name: "testName",
    image: "imageTest",
    speed: 2,
    life: 13,
    dateEst: "date",
  },
];

describe("Given HttpStoreRobots", () => {
  describe("When we instantiate it and use getRobots method", () => {
    test("Then the fetch should return an array of robots", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(resp),
      });
      const result = await HttpStoreRobots.prototype.getAllRobots();
      expect(fetch).toBeCalled();
      expect(result).toEqual(resp);
    });
  });
  describe("When we instantiate it and use getRobot method", () => {
    const mockRobot = {
      _id: "1",
      name: "testName",
      image: "imageTest",
      speed: 2,
      life: 13,
      dateEst: "date",
    };
    test("Then it should return a robot", async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValue({ json: jest.fn().mockResolvedValue(mockRobot) });
      const result = await HttpStoreRobots.prototype.getRobot(mockRobot._id);
      expect(result).toEqual(mockRobot);
    });
  });
  describe("When we instantiate it and use setRobot method", () => {
    const mockRobot = {
      _id: "1",
      name: "testName",
      image: "imageTest",
      speed: 2,
      life: 13,
      dateEst: "date",
    };
    test("Then it should return the added robot", async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValue({ json: jest.fn().mockResolvedValue(mockRobot) });
      const result = await HttpStoreRobots.prototype.setRobot(mockRobot);
      expect(result).toEqual(mockRobot);
    });
  });
  describe("When we instantiate it and use updateRobot method", () => {
    const mockRobot = {
      _id: "1",
      name: "testName",
      image: "imageTest",
      speed: 2,
      life: 13,
      dateEst: "date",
    };
    test("Then it should return the updated robot", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest
          .fn()
          .mockResolvedValue({ ...mockRobot, name: "testNewName" }),
      });
      const finalProduct = { ...mockRobot, name: "testNewName" };
      const result = await HttpStoreRobots.prototype.updateRobot({
        ...mockRobot,
        name: "testNewName",
      });
      expect(result).toEqual(finalProduct);
    });
  });
  describe("When we instantiate it and use deleteRobot method", () => {
    const mockRobot = {
      _id: "1",
      name: "testName",
      image: "imageTest",
      speed: 2,
      life: 13,
      dateEst: "date",
    };
    test("Then it should return the deleted robot", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockRobot),
      });
      const result = await HttpStoreRobots.prototype.deleteRobot(mockRobot._id);
      expect(result).toEqual(mockRobot);
    });
  });
});
