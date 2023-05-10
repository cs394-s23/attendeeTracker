import NavBar from "./NavBar";
import Event from "./Event";
import "../styles/Home.css";


const Dashboard = ( { data } ) => {

  if (!data) {
    return <h1>Data is loading...</h1>;
  }
  console.log(data);
  return (
    <div>
      <NavBar />
      <h1 id="header"> Events </h1>
      <div className="feed">

        {data.Events.map((event, index) => (
          <Event data={event} key={index} />
        ))}

      </div>
    </div>
  );
};

export default Dashboard;
