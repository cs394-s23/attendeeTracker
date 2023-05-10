import "../styles/Dashboard.css";
import NavBar from "./NavBar";
import DashInfoCard from "./dashInfoCard";
import DashAttendanceCard from "./dashAttendanceCard";
const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <div className="dashboard">
        <h1>Data Science Event</h1>
        <DashInfoCard className="info-card" />
        <DashAttendanceCard className="attendance-card" />
        <div className="analytics">
          <h2>Response Rate:</h2>

          <h2>Graph:</h2>
        </div>
        <div className="reminder">
          <button>Send Reminder</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
