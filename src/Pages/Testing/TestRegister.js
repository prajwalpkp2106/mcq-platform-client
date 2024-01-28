import { Button, Card } from "antd";
import { Field, Formik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { startLoading, stopLoading } from "../../store/actions";
import { Requests } from "../../utils";
function TestRegister(props) {
  const { eventId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    props.startLoading("Getting Event Details");
    Requests.getContestById(eventId)
      .then((res) => {
        setData(res.data.data);
        props.stopLoading();
      })
      .catch((err) => {
        alert(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  return (
    <div className="">
      <Formik
        initialValues={{
          email: "",
          name: "",
          eventName: data.title,
          mobile: "",
        }}
        onSubmit={(values) => {
          props.startLoading("Requesting");
          values = { ...values, eventName: data.title };
          Requests.generateUser(values).then((res) => {
            alert(res.data.data);
            navigate("/");
            props.stopLoading();
          });
        }}
      >
        {(formik) => {
          return (
            <div className=" w-[400px] mx-auto my-8">
              <Card title="Register for event: ">
                <div className="flex flex-col space-y-2 mx-auto p-4 bg-gray-50">
                  <Field
                    name="email"
                    placeholder="E-Mail"
                    onChange={formik.handleChange}
                    className="p-2"
                  ></Field>
                  <Field
                    name="name"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    className="p-2"
                  ></Field>
                  <Field
                    name="mobile"
                    placeholder="Mobile"
                    onChange={formik.handleChange}
                    className="p-2"
                    type="number"
                  ></Field>
                  <div>
                    <span>Event Name: </span>
                    {data.title}
                  </div>
                  <Button onClick={formik.handleSubmit}>Submit</Button>
                </div>
              </Card>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: (msg) => dispatch(startLoading(msg)),
    stopLoading: () => dispatch(stopLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestRegister);
