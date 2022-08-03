
import { Button } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.less';
import 'antd/dist/antd.css';
import Header from "../src/Components/Header/Header"
import Instructions from './Pages/Instructions/Instructions';
import Questions from './Pages/Questions/Questions';
import Home  from './Pages/Home/Home';
import Login from './Pages/LoginSignup/Login';
import { connect } from 'react-redux';
import { login } from './store/actions';



function App(props) {
  return (
     <div className="App">
      <Header />
   
     <Routes>
       <Route path="/contests" element={<Home />}> </Route>
       <Route path="/contests/:id"></Route>
       <Route path="/" element={<Instructions />}> </Route>
     
        <Route path="/questions"  element={<Questions />} >   </Route>
         <Route path="/login" element={<Login />}  />
     </Routes>
     </div>
  )
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
