import "../styles/Event.css"

const Event = (data) => {
    data = data.data;
    console.log(data);
    return (
        <div className="ind-card">
            <h3>{data.name}</h3>
            <p>{data.details}</p>
            <p>{data.count.going} going, {data.count.invited} invited, {data.count.not_going} not going</p>
        </div>
    );
  };
  
  export default Event;