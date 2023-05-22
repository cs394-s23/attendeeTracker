import NavBar from "./NavBar";
import Event from "./Event";
import "../styles/Home.css";

const Home = ({ data }) => {
  if (!data) {
    return (
      <div>
      <NavBar />
      <h1 id="header"> Events </h1>
    </div>
    );
  }
  // console.log(data.Events);
  var newData = Object.values(data.Events);
  console.log(newData);
  return (
    <div>
      <NavBar />
      <h1 id="header"> Events </h1>
      <div className="feed">
        {newData.map((event, index) => (
          <Event data={event} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
