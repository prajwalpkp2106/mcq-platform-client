import { Routes, Route } from "react-router-dom";
import "./App.less";
// import "antd/dist/antd.min.css"
import "antd/dist/antd.css";
import Header from "../src/Components/Header/Header";
import Instructions from "./Pages/Instructions/Instructions";
import Questions from "./Pages/Solve/Solve";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import { connect } from "react-redux";
import { login, setRegisteredEvents } from "./store/actions";
import Contest from "./Pages/Contest/Contest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import NotFound from "./Pages/404/404";
import { Requests } from "./utils";
import { Spin } from "antd";

function App(props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const userData = {
      name: "Vedant Daigavane",
      _id: "62f1fc115f5d2337c06e453b",
    };
    props.login(userData);
    Requests.getUserParticipations(userData._id).then((res) => {
      res = res.data;
      if (res.success) {
        props.setRegisteredEvents(res.data);
        console.log(res);
        setLoading(false);
      }
    });
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="app">
        <div className="overlay">
          <Header />
          <Routes>
            <Route path=":id/instructions" element={<Instructions />}></Route>
            <Route path=":id/solve" element={<Questions />}></Route>
            <Route path="/contests" element={<Contest />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
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
      </div>
    </Spin>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setRegisteredEvents: (data) => dispatch(setRegisteredEvents(data)),
    login: (data) => dispatch(login(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
