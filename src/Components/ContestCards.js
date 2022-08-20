import { Alert, Button, Card } from "antd";
import Countdown from "./Countdown";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Requests } from "../utils";

function ContestCards({ contest, ...props }) {
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    contest._id &&
      props.registeredEvents.forEach((event) => {
        if (event.contestId == contest._id) setRegistered(true);
      });
  }, []);

  return (
    <Card
      title={
        <div className="space-y-4">
          <div className="w-full">
            <img
              className="h-[150px] mx-auto my-2"
              alt="contest logo"
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
          <div className=" text-right">{contest.startTime.split("T")[0]}</div>
        </div>
        {contest.status.time ? (
          <div className="flex justify-between">
            {contest.status.description === "RUNNING" ? (
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
            {registered ? (
              contest.status.description === "RUNNING" ? (
                <Link to={`/${contest._id}/instructions`}>
                  <Button
                    type="primary"
                    className=" bg-sky-500"
                    disabled={!contest.status.time}
                  >
                    Enter Contest
                  </Button>
                </Link>
              ) : (
                <div className="text-green-500">Registered Successfully</div>
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
                    href={
                      props.testing
                        ? "http://localhost:3000/test/register/" + contest._id
                        : "https://pcsbxenia.com/"
                    }
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
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    userData: state.userData,
    testing: state.testing,
  };
};

export default connect(mapStateToProps)(ContestCards);
