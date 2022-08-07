import { Button } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.less";
// import "antd/dist/antd.min.css"
import "antd/dist/antd.css";
import Header from "../src/Components/Header/Header";
import Instructions from "./Pages/Instructions/Instructions";
import Questions from "./Pages/Questions/Questions";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import { connect } from "react-redux";
import { login } from "./store/actions";
import Contest from "./Pages/Contest/Contest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function App(props) {
  useEffect(() => {
    const userData = {
      name: "Vedant Daigavane",
    };
    props.login(userData);
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/contests/:id/instructions"
          element={<Instructions />}
        ></Route>
        <Route path="/contests/:id/solve" element={<Questions />}></Route>
        <Route path="/contests/:id"></Route>
        <Route path="/contests" element={<Contest />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
