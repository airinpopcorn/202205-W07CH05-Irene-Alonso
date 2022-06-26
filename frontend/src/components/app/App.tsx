import React, { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  const robots = useMemo(() => new HttpStoreRobots(), []);
  // const navigate = useNavigate();

  useEffect(() => {
    robots.getAllRobots().then((robots) => {
      dispatch(ac.loadRobot(robots));
    });
  }, [dispatch, robots]);

  const HomePage = React.lazy(() => import("../../pages/home"));
  const Details = React.lazy(() => import("../../pages/details"));

  const options: aMenuItems = [
    { path: "", label: "Home", page: <HomePage></HomePage> },
    { path: "details", label: "Detalles", page: <Details></Details> },
  ];
  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default App;
