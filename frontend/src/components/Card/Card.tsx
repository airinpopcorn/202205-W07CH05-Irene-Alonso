import { iRobot } from "../../models/robot";
import { Link } from "react-router-dom";
import * as ac from "../../reducers/robot/actions.creators";
import { HttpStoreRobots } from "../../services/http.store.robot";
import { useDispatch } from "react-redux";

export function CardRobot({ robot }: { robot: iRobot }) {
  const api = new HttpStoreRobots();
  const dispatch = useDispatch();

  const handleDelete = () => {
    api.deleteRobot(robot._id).then(() => {
      dispatch(ac.deleteRobot(robot));
    });
  };
  return (
    <>
      <Link to={"../details/" + robot._id}>
        <img src={robot.image} alt={`Robot ${robot.name}`} />
      </Link>
      <p>{robot.name}</p>
      <button onClick={() => handleDelete()}>Borrar</button>
    </>
  );
}
