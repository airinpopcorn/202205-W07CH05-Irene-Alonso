// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { List } from "../components/List/List";
import { iState } from "../store/store";

export function HomePage() {
  const robots = useSelector((state: iState) => state.robots);

  return (
    <main>
      <h2>ROBOTS</h2>
      <List robots={robots} />
    </main>
  );
}

export default HomePage;
