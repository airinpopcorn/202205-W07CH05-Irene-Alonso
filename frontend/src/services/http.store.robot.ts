import { iRobot } from "../models/robot";

export class HttpStoreRobots {
  apiUrl: string;
  constructor() {
    this.apiUrl = "http://localhost:3400/robots";
  }

  getAllRobots(): Promise<Array<iRobot>> {
    return fetch(this.apiUrl).then((resp) => {
      return resp.json();
    });
  }

  getRobot(id: iRobot["_id"]): Promise<iRobot> {
    return fetch(this.apiUrl + String(id)).then((resp) => resp.json());
  }

  setRobot(robot: iRobot): Promise<iRobot> {
    return fetch(this.apiUrl, {
      method: "POST",
      body: JSON.stringify(robot),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  updateRobot(robot: iRobot): Promise<iRobot> {
    return fetch(this.apiUrl + robot._id, {
      method: "PATCH",
      body: JSON.stringify(robot),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  }

  deleteRobot(id: iRobot["_id"]): Promise<number> {
    return fetch(this.apiUrl + id, {
      method: "DELETE",
    }).then((resp) => resp.json());
  }
}
