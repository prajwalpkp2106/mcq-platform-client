import React, { useEffect, useState } from "react";
// import { Card, Button, Spin, Alert } from "antd";
import { Spin } from "antd";

import { connect } from "react-redux";
import { Requests } from "../../utils";
import ContestCards from "../../Components/ContestCards";

const Contest = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Requests.getAllContests()
      .then((res) => {
        const response = res.data;
        if (response.success) {
          console.log(response.data);
          setData(response.data);
          setLoading(false);
          
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <Spin className=" min-h-screen" spinning={loading}>
      <div className="w-full md:w-10/12 mx-auto p-2 md:p-4 grid md:grid-cols-2 items-center xl:grid-cols-3 gap-5 content-center">
        {data.map((contest) => {
          return (
            <ContestCards
              registeredEvents={props.registeredEvents}
              contest={contest}
            ></ContestCards>
          );
        })}
      </div>
    </Spin>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
    registeredEvents: state.registeredEvents,
  };
}

export default connect(mapStateToProps)(Contest);
