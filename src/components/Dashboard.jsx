import "../styles/Dashboard.css";
import NavBar from "./NavBar";

import DashInfoCard from "./dashInfoCard";
import DashAttendanceCard from "./dashAttendanceCard";
import DashChartCard from "./DashChartCard";
import { useParams } from "react-router-dom";

const Dashboard = ({ data }) => {
  let { eventId } = useParams();
  //console.log("eventId " + eventId);
  if (!data) {
    return <h1>Data is loading...</h1>;
  }
  console.log("hi" + data);
  var user = JSON.parse(localStorage.getItem("oauth2-test-params"))['user_id'];
  data = data[user][eventId];



  return (
    <div>
      <NavBar />
      <div className="dashboard">
        <h1>{data.name}</h1>
        <DashInfoCard data={data} />
        <DashAttendanceCard data={data} />
        <DashChartCard data={data} />

      </div>
    </div>
  );
};

export default Dashboard;
