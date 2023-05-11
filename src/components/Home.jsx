import NavBar from "./NavBar";
import Event from "./Event";
import "../styles/Home.css";


const Home = ( { data } ) => {

  if (!data) {
    return <h1>Data is loading...</h1>;
  }
  console.log(data);
  return (
    <div>
      <NavBar />
    
      <div className="homepage-container">
        
        <h1 id="header"> Events </h1>
        <div className="feed">

          {data.Events.map((event, index) => (
            <Event data={event} key={index} />
          ))}

        </div>
      </div>
    </div>
  );
};

export default Home;
