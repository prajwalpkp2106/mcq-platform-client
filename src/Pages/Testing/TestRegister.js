import { Button, Card } from "antd";
import { Field, Formik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Requests } from "../../utils";

export default function TestRegister() {
  const { eventId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    Requests.getContestById(eventId).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div className="">
      <Formik
        initialValues={{
          email: "",
          name: "",
          eventName: "",
          mobile: "",
        }}
      >
        {(formik) => {
          return (
            <div className=" w-[400px] mx-auto my-8">
              <Card title="Register for event: ">
                <div className="flex flex-col space-y-2 mx-auto p-4 bg-gray-50">
                  <Field
                    name="email"
                    placeHolder="E-Mail"
                    onChange={formik.handleChange}
                    className="p-2"
                  ></Field>
                  <Field
                    name="name"
                    placeHolder="Name"
                    onChange={formik.handleChange}
                    className="p-2"
                  ></Field>
                  <Field
                    name="eventName"
                    placeHolder="Event Name"
                    value={data.name}
                    className="p-2"
                  ></Field>
                  <Button>Submit</Button>
                </div>
              </Card>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
