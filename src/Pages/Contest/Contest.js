import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { getContest } from "../../api/Requests";
import Loader from "../../Components/Loader/Loader";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Data = [
  {
    name: "first",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/SVG_Logo.svg/1200px-SVG_Logo.svg.png",
    _id: 12,
  },
  {
    name: "first",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/SVG_Logo.svg/1200px-SVG_Logo.svg.png",
  },
  {
    name: "first",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/SVG_Logo.svg/1200px-SVG_Logo.svg.png",
  },
  {
    name: "first",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/SVG_Logo.svg/1200px-SVG_Logo.svg.png",
  },
];
const Contest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // useEffect(()=>{
  //     setLoading(true);
  //     getContest()
  //     .then((res)=>{
  //         setData(res);
  //         setLoading(false);
  //     })
  //     .catch((error)=>{})

  // },[]);

  return (
    <div className="w-full md:w-10/12 mx-auto p-2 md:p-4 grid items-center md:grid-cols-3 gap-5 content-center">
      {loading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : (
        <>
          {Data.map((contest) => {
            return (
              <Card
                title={
                  <div className="text-white">
                    <div className="w-full">
                      <img
                        className="h-[150px] mx-auto my-2"
                        src={contest.image}
                      ></img>
                    </div>
                    <div className=" font-bolds tracking-wider">Title</div>
                  </div>
                }
                bodyStyle={{
                  background: "rgb(0,0,0,0.5)",
                }}
                headStyle={{
                  background: "rgb(50, 50, 50, 0.2)",
                }}
                className=" w-80 md:w-[400px] bg-black/20 inline-block text-white mx-auto border-none shadow-cyan-300"
              >
                <div className="space-y-4">
                  <div className="">
                    Inner Card content Inner Card content Inner Card content
                    Inner Card content
                  </div>
                  <div className="float-left">Starts In: 12:23:00</div>
                  <Link to={`/contest/${contest._id}`}>
                    <Button
                      type="primary"
                      className=" float-right border-white"
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
