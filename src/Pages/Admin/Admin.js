import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Requests } from "../../utils";

export default function Admin() {
  const [contests, setcontests] = useState([]);


  useEffect(() => {
    Requests.getAllContests().then((res) => {
      setcontests(res?.data?.data);
      console.log(contests)
    });
  }, [contests]);

  const tabs = [
    {
      to: "/admin2022",
      title: "Contests",
    },
    {
      to: "/admin2022/insert",
      title: "Insert",
    },
    {
      to: "/admin2022/update",
      title: "Update",
    },
    {
      to: "/admin2022/insert",
      title: "Delete",
    },
  ];

  return (
    <div className="">
      <div>
        {tabs.map((tab) => {
          return (
            <Link to={tab.to}>
              <div className="p-2 px-4 bg-slate-200 inline-block m-2">
                {tab.title}
              </div>
            </Link>
          );
        })}
      </div>
      <Routes>
        <Route path="" element={<div>Contests</div>}></Route>
        <Route path="insert" element={<div>insert</div>}></Route>
        <Route path="update" element={<div>insert</div>}></Route>
        <Route path="delete" element={<div>insert</div>}></Route>
      </Routes>
    </div>
  );
}

// const contestCols = [
//   {
//     title: "_id",
//     selector: (row) => row.name,
//   },
//   {
//     title: "name",
//     selector: (row) => row.name,
//   },
// ];
