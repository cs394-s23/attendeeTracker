import NavBar from "./NavBar";
import "../styles/Home.css";
const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <h1 id="header"> Events </h1>
      <div className="feed">
        <div className="ind-card">
          <h3>Data Science Event</h3>
          <p>Party for data science enthusiasts</p>
          <p>50 going, 100 invited</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
