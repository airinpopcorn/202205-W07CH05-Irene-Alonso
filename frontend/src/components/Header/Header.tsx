import { Link } from "react-router-dom";
import { aMenuItems } from "../../interfaces/menu-items";

export function Header({ options }: { options: aMenuItems }) {
  return (
    <>
      <h1>ROBOT PARTY</h1>
      <nav>
        <ul>
          {options.map((item) =>
            item.label !== "Detalles" ? (
              <li key={item.label}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ) : (
              ""
            )
          )}
        </ul>
      </nav>
    </>
  );
}
