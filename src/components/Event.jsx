import "../styles/Event.css";
import { useNavigate } from "react-router-dom";

const Event = (data, key) => {
  data = data.data;

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/" + data.key;
    navigate(path);
  };

  return (
    <div className="ind-card" onClick={routeChange}>
      <h3>{data.name}</h3>
      <p>{data.details}</p>
      <p>
        {data.count.attending} attending, {data.count.no_response} no response,{" "}
        {data.count.not_attending} not attending
      </p>
    </div>
  );
};

export default Event;
