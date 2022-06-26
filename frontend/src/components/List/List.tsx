import { iRobot } from "../../models/robot";
import { CardRobot } from "../Card/Card";

export function List({ robots }: { robots: Array<iRobot> }) {
  return (
    <ul>
      {robots.map((item) => (
        <li key={item._id}>
          <CardRobot robot={item} />
        </li>
      ))}
    </ul>
  );
}
