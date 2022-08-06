import React, { useState } from "react";
import "tailwindcss/tailwind.css"

// import * as Yup from "yup";
// import { Validators } from "../../Utils/Index";
import { connect } from "react-redux";
import { login } from "../../api/Requests";
import { Link } from "react-router-dom";
import { Formik,Field } from "formik";
const Login = (props) => {
  const [error, setError] = useState(null);

//   const validate = Yup.object({
//     email: Validators.emailRequired,
//     password: Validators.stringRequired,
//   });

  return (
    <div>
       <Formik
        initialValues={{
          email: "",
          password: "",
        }}
      
        onSubmit={async (values) => {
          setError(null);
          login(values)
            .then((res) => {
              localStorage.setItem("xeniaverse", res.data.token);
              props.login(res.data);
              props.closeModal();
            })
            .catch((err) => {
              setError(err.response.data.msg);
            });
        }}
      >
        {(formik) => (
          <div className="p-2 space-y-4 tracking-wider">
            <h1 className="text-2xl font-bold text-center">Sign In</h1>
            <div className="">
              <Field
                className="w-full rounded border bg-gray-100 border-gray-200 p-2"
                placeholder={"Email"}
                name={"email"}
                type={"text"}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <div className="text-red-500 font-bold">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="">
              <Field
                className="w-full rounded border bg-gray-100 border-gray-200 p-2"
                placeholder={"Password"}
                name={"password"}
                type={"password"}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <div className="text-red-500 font-bold">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="flex items-baseline justify-between">
              <button
                className="px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-800"
                type="button"
                onClick={formik.handleSubmit}
              >
                Login
              </button>
              <Link
                class="text-medium text-blue-600 hover:underline"
                to="/forgotpassword"
                onClick={props.closeModal}
              >
                Forgot Password ?
              </Link>
            </div>
            {error && <div className="text-red-500 font-bold">{error}</div>}
            <p className="link">
              <div> Don't have an account?</div>
              <div
                className="font-bold cursor-pointer text-white"
                onClick={props.toggle}
              >
                Create Account
              </div>
            </p>
          </div>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

 export default connect(mapStateToProps, mapDispatchToProps)(Login);

