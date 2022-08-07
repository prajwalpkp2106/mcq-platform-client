import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { login, logout } from "../../store/actions";

const Header = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  function logout() {
    props.logout();
    toast.success("Logged Out Successfully");
    localStorage.clear();
  }

  return (
    <div
      className={
        "relative shadow-lg flex flex-wrap items-center justify-between px-2 py-3 z-50 text-white bg-black/40"
      }
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between text-white">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start text-white">
          {props.isAuthenticated && (
            <div className=" font-bold text-2xl flex items-center text-gray-300">
              <img
                src={
                  "https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png"
                }
                className="h-8 md:h-10 w-auto"
              ></img>
              <div className=" px-2">{props?.userData?.name}</div>
            </div>
          )}
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none text-white z-10 bg-black"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i
              className={
                (props.transparent ? "text-white" : "text-gray-50") +
                "fas fa-bars"
              }
            ></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center  lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block rounded " : " hidden")
          }
          id="example-navbar-warning"
        >
          {props.isAuthenticated ? (
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  to={`/`}
                  onClick={() => setNavbarOpen(!navbarOpen)}
                  className="px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold hover:text-cyan-300"
                >
                  <span className="hide-sm">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/contests`}
                  onClick={() => setNavbarOpen(!navbarOpen)}
                  className={
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold hover:text-cyan-300"
                  }
                >
                  <span className="hide-sm">DashBoard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={logout}
                  to="/"
                  replace
                  className=" px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold hover:text-cyan-300"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span className="hide-sm"> &nbsp;Logout</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  to="/login"
                  className="px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold hover:text-cyan-300"
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
    userData: state.userData,
  };
}
function mapActionToProps(dispatch) {
  return {
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapActionToProps)(Header);
