import React, { useEffect, useState } from "react";
import { Card, Button, Spin, Alert } from "antd";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllContests } from "../../utils/Requests";
import { Requests } from "../../utils";
import Countdown from "../../Components/Countdown";

const Contest = (props) => {
  const [data, setData] = useState([{ status: 0, startTime: "DD/MM/YYYY" }]);
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
    <Spin className=" min-h-screen" spinning={loading}>
      <div className="w-full md:w-10/12 mx-auto p-2 md:p-4 grid md:grid-cols-2 items-center xl:grid-cols-3 gap-5 content-center">
        {data.map((contest) => {
          return (
            <Card
              title={
                <div className="space-y-4">
                  <div className="w-full">
                    <img
                      className="h-[150px] mx-auto my-2"
                      src={contest.logo}
                    ></img>
                  </div>
                  <div className=" font-bolds tracking-wider text-lg">
                    {contest.title}
                  </div>
                </div>
              }
              className=" w-80 md:w-[400px] bg-white inline-block text-black mx-auto border-none shadow-cyan-300 min-h-[400px] hover:shadow-lg transition"
            >
              <div className="space-y-2 text-gray-500">
                <div className="flex justify-between">
                  <div className="float-left">Date</div>
                  <div className=" text-right">
                    {contest.startTime.split("T")[0]}
                  </div>
                </div>
                {contest.status.time ? (
                  <div className="flex justify-between">
                    {contest.status.description == "RUNNING" ? (
                      <>
                        <div className="text-red-400">Ends in</div>
                        <Countdown seconds={contest.status.time}></Countdown>
                      </>
                    ) : (
                      <>
                        <div className="">Starts in</div>
                        <Countdown seconds={contest.status.time}></Countdown>
                      </>
                    )}
                  </div>
                ) : (
                  <Alert message="Contest Ended" type="error" showIcon></Alert>
                )}
                {contest.status.time > 0 && (
                  <div className=" space-y-2">
                    {false ? (
                      contest.status.description === "RUNNING" ? (
                        <Link
                          to={
                            props.isAuthenticated ? `/${contest._id}` : "/login"
                          }
                        >
                          <button
                            className="text-white bg-cyan-500 hover:bg-cyan-400 focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            disabled={!contest.status.time}
                          >
                            Enter Contest
                          </button>
                        </Link>
                      ) : (
                        <div className="text-green-500">
                          Registered Successfully
                        </div>
                      )
                    ) : (
                      <>
                        <Alert
                          type="warning"
                          message="You have not registered for this event."
                          showIcon
                        ></Alert>
                        <div className=" space-x-2">
                          <a
                            href="https://pcsbxenia.com/"
                            rel="noreferrer"
                            target="_blank"
                          >
                            <Button
                              type={"default"}
                              disabled={!contest.status.time}
                              className={"bg-green-400"}
                            >
                              Register
                            </Button>
                          </a>

                          <Link to={`/${contest._id}/instructions`}>
                            <Button
                              type="primary"
                              className="border-black text-black border"
                            >
                              Details
                            </Button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </Spin>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Contest);
