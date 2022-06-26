import { iRobot } from "../../models/robot";
import { Link } from "react-router-dom";

export function CardRobot({ robot }: { robot: iRobot }) {
  return (
    <>
      <Link to={"../details/" + robot._id}>
        <img src={robot.image} alt={`Robot ${robot.name}`} />
      </Link>
      <img src={robot.image} alt={`Robot ${robot.name}`} />
      <p>{robot.name}</p>
      <button>Borrar</button>
    </>
  );
}
