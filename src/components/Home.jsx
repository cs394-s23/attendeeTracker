import NavBar from "./NavBar";
import Event from "./Event";
import "../styles/Home.css";

<<<<<<< HEAD
const Dashboard = ({ data }) => {
=======
const Dashboard = ( { data } ) => {
>>>>>>> main
  if (!data) {
    return <h1>Data is loading...</h1>;
  }
  console.log(data);
  return (
    <div>
      <NavBar />
      <h1 id="header"> Events </h1>
      <div className="feed">
<<<<<<< HEAD
        {data.Events.map((event, index) => (
          <Event data={event} key={index} />
        ))}
=======
        {data.Events.map((event, index) => <Event data={event} key={index} />)}
>>>>>>> main
      </div>
    </div>
  );
};

export default Dashboard;
