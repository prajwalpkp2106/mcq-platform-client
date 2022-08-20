import { Button, Card } from "antd";
import { Field, Formik } from "formik";
import React from "react";

export default function TestRegister() {
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
            <div>
              <Card title="Register for event: ">
                <Field
                  name="email"
                  placeHolder="E-Mail"
                  onChange={formik.handleChange}
                ></Field>
                <Field
                  name="name"
                  placeHolder="Name"
                  onChange={formik.handleChange}
                ></Field>
                <Field
                  name="eventName"
                  placeHolder="Event Name"
                  onChange={formik.handleChange}
                ></Field>
                <Field
                  name="eventName"
                  placeHolder="Event Name"
                  onChange={formik.handleChange}
                ></Field>
                <Button>Submit</Button>
              </Card>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
