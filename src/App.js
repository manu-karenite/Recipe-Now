import { Routes, Route, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";
import Footer from "./Components/Footer.js";

import Header from "./Components/Header.js";
import { useDispatch } from "react-redux";
import Home from "./Pages/Home.js";
import Profile from "./Pages/Profile.js";
import Recipes from "./Pages/Recipes.js";

function App() {
  const dispatch = useDispatch();
  const setData = () => {
    let x = null;
    if (window !== "undefined" && window.localStorage.getItem("ATPL")) {
      x = JSON.parse(window.localStorage.getItem("ATPL"));
    }
    dispatch({
      type: "USER",
      payload: x,
    });
  };
  React.useEffect(() => {
    setData();
  }, []);
  return (
    <>
      <ToastContainer />{" "}
      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/my-profile"
          exact
          element={
            <>
              <Header />
              <Profile />
              <Footer />
            </>
          }
        />
        <Route
          path="/recipes/:searchParams"
          exact
          element={
            <>
              <Header />
              <Recipes />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
