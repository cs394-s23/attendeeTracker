import NavBar from "./NavBar";
import Event from "./Event";
import "../styles/Home.css";

import React, { useState, useEffect } from "react";

const Home = ({ data }) => {
  const [hasParams, setHasParams] = useState(
    localStorage.getItem("oauth2-test-params")
  );

  if (!data || !hasParams) {
    return (
      <div>
        <NavBar />
        <h1 id="header"> Events </h1>
        <h1 id="header"> Past Events </h1>
      </div>
    );
  }

  var user = JSON.parse(localStorage.getItem("oauth2-test-params"))["user_id"];

  if (!data.hasOwnProperty(user)) {
    return (
      <div>
        <NavBar />
        <h1 id="header"> No Current Events </h1>
      </div>
    );
  }

  var newData = Object.values(data[user]);

  return (
    <div>
      <NavBar />
      <h1 id="header"> Events </h1>
      <div className="feed">
        {newData
          .filter(
            (post) =>
              !(
                (parseInt(post.time.substring(2, 4)) - 1 <=
                  new Date().getDate() &&
                  parseInt(post.time[0]) - 1 <= new Date().getMonth() &&
                  parseInt(post.time.substring(5, 7)) + 2000 ==
                    new Date().getFullYear()) ||
                (parseInt(post.time[0]) - 1 < new Date().getMonth() &&
                  parseInt(post.time.substring(5, 7)) + 2000 ==
                    new Date().getFullYear()) ||
                parseInt(post.time.substring(5, 7)) + 2000 <
                  new Date().getFullYear()
              )
          )
          .map((event, index) => (
            <Event data={event} key={index} />
          ))}
      </div>
      <h1 id="header"> Past Events </h1>
      <div className="feed">
        {newData
          .filter(
            (post) =>
              (parseInt(post.time.substring(2, 4)) - 1 <=
                new Date().getDate() &&
                parseInt(post.time[0]) - 1 <= new Date().getMonth() &&
                parseInt(post.time.substring(5, 7)) + 2000 ==
                  new Date().getFullYear()) ||
              (parseInt(post.time[0]) - 1 < new Date().getMonth() &&
                parseInt(post.time.substring(5, 7)) + 2000 ==
                  new Date().getFullYear()) ||
              parseInt(post.time.substring(5, 7)) + 2000 <
                new Date().getFullYear()
          )
          .map((event, index) => (
            <Event data={event} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Home;
