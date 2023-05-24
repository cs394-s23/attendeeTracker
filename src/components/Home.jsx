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
  
  return (
    <div>
      <NavBar />
      <h1 id="header"> Events </h1>
      <div className="feed">
      {newData.filter(post => parseInt(post.time[0]) - 1 >= new Date().getMonth() &&
                                parseInt(post.time.substring(2,4)) - 1 >= new Date().getDate() &&
                                parseInt(post.time.substring(5,7)) + 2000 >= new Date().getFullYear() &&
                                parseInt(post.time.substring(8,10)) - 1 >= new Date().getHours() ||
                                parseInt(post.time.substring(11)) - 1 >= new Date().getMinutes()
                                ).map((event, index) => (
          <Event data={event} key={index} />
        ))}
      </div>
      <h1 id="header"> Past Events </h1>
      <div className="feed">
        {newData.filter(post => parseInt(post.time[0]) - 1 < new Date().getMonth() &&
                                parseInt(post.time.substring(2,4)) - 1 < new Date().getDate() &&
                                parseInt(post.time.substring(5,7)) + 2000 < new Date().getFullYear() &&
                                parseInt(post.time.substring(8,10)) - 1 < new Date().getHours() ||
                                parseInt(post.time.substring(11)) - 1 < new Date().getMinutes()
                                ).map((event, index) => (
          <Event data={event} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
