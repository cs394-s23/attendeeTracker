import "../styles/Dashboard.css";
import NavBar from "./NavBar";

import DashInfoCard from "./dashInfoCard";
import DashAttendanceCard from "./dashAttendanceCard";
import DashChartCard from "./DashChartCard";
import { useParams } from "react-router-dom";
import DashReminderCard from "./DashReminderCard";

const Dashboard = ({ data }) => {
  let { eventId } = useParams();
  if (!data) {
    return <h1>Data is loading...</h1>;
  }

  var user = JSON.parse(localStorage.getItem("oauth2-test-params"))["user_id"];
  data = data[user][eventId];

  if (!data.hasOwnProperty("reminder_count")) {
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
  } else {
    return (
      <div>
        <NavBar />
        <div className="dashboard">
          <h1>{data.name}</h1>
          <DashInfoCard data={data} />
          <DashAttendanceCard data={data} />
          <DashReminderCard data={data} />
          <DashChartCard data={data} />
        </div>
      </div>
    );
  }
};

export default Dashboard;
