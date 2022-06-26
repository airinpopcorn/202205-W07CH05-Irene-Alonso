import React, { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { aMenuItems } from "../../interfaces/menu-items";
import "./App.css";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as ac from "../../reducers/robot/actions.creators";
import { HttpStoreRobots } from "../../services/http.store.robot";
import { Layout } from "../Layout/Layout";

function App() {
  const dispatch = useDispatch();
  const apiRobots = useMemo(() => new HttpStoreRobots(), []);

  useEffect(() => {
    apiRobots.getAllRobots().then((robots) => {
      dispatch(ac.loadRobot(robots));
    });
  }, [dispatch, apiRobots]);

  const HomePage = React.lazy(() => import("../../pages/home"));
  const Details = React.lazy(() => import("../../pages/details"));

  const options: aMenuItems = [
    { path: "", label: "Home", page: <HomePage></HomePage> },
    { path: "details", label: "Detalles", page: <Details></Details> },
  ];
  return (
    <>
      <Layout options={options}>
        <React.Suspense>
          <Routes>
            {options.map((item) => (
              <Route
                key={item.label}
                path={item.path}
                element={item.page}
              ></Route>
            ))}
          </Routes>
        </React.Suspense>
      </Layout>
    </>
  );
}

export default App;
