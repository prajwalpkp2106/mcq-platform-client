import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";

import Loader from "../../Components/Loader/Loader";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllContests } from "../../api/Requests";
import { Requests } from "../../utils";

const Contest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    Requests.getAllContests()
      .then((res) => {
        const response = res.data;
        if (response.success) {
          setData(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="w-full md:w-10/12 mx-auto p-2 md:p-4 grid md:grid-cols-2 items-center xl:grid-cols-3 gap-5 content-center">
      {loading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : (
        <>
          {data.map((contest) => {
            return (
              <Card
                title={
                  <div className="">
                    <div className="w-full">
                      <img
                        className="h-[150px] mx-auto my-2"
                        src={contest.image}
                      ></img>
                    </div>
                    <div className=" font-bolds tracking-wider text-lg">
                      {contest.title}
                    </div>
                  </div>
                }
                className=" w-80 md:w-[400px] bg-white inline-block text-black mx-auto border-none shadow-cyan-300"
              >
                <div className="space-y-4">
                  <div className="">{contest.descriptions[0]}</div>
                  <div className="float-left">Starts In: 12:23:00</div>
                  <Link to={`/${contest._id}/instructions`}>
                    <Button
                      type="primary"
                      className=" float-right border-black text-black bg-sky-300 border-none"
                    >
                      Detail
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Contest);
