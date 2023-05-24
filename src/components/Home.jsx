import NavBar from "./NavBar";
import Event from "./Event";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { Reminder } from "./Reminder";

import {
  saveToken,
  oauth2SignIn,
  getUserInfo,
} from "../utilities/googleFormApi";
import Button from "react-bootstrap/Button";

const Home = ({ data }) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/create";
    navigate(path);
  };
  console.log(data)
  var user = JSON.parse(localStorage.getItem("oauth2-test-params"))['user_id'];
  var isUserThere = JSON.parse(localStorage.getItem("oauth2-test-params")).hasOwnProperty('user_id');
  console.log(user)
  console.log(isUserThere)
  if (!data || !isUserThere) {
    return (
      <div>
        <NavBar />
        <h1 id="header"> Events </h1>
      </div>
    );
  }

  

  // console.log(data.Events);
  var newData = Object.values(data[user]);

  // getUserInfo();
  return (
    <div>
      <NavBar />
      <h1 id="header"> Events </h1>
      <div className="feed">
        {newData
          .filter(
            (post) =>
              !(
                (
                  parseInt(post.time[0]) - 1 < new Date().getMonth() ||
                  parseInt(post.time.substring(2, 4)) - 1 <
                    new Date().getDate() ||
                  parseInt(post.time.substring(5, 7)) + 2000 <
                    new Date().getFullYear()
                )
                //   &&
                //   parseInt(post.time.substring(8, 10)) - 1 <
                //     new Date().getHours()) ||
                // parseInt(post.time.substring(11)) - 1 < new Date().getMinutes()
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
              parseInt(post.time[0]) - 1 < new Date().getMonth() ||
              parseInt(post.time.substring(2, 4)) - 1 < new Date().getDate() ||
              parseInt(post.time.substring(5, 7)) + 2000 <
                new Date().getFullYear()
            //   &&
            //   parseInt(post.time.substring(8, 10)) - 1 <
            //     new Date().getHours()) ||
            // parseInt(post.time.substring(11)) - 1 < new Date().getMinutes()
          )
          .map((event, index) => (
            <Event data={event} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Home;
