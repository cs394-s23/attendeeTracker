import "../styles/Event.css";
import { useNavigate } from "react-router-dom";

const Event = (data) => {
  data = data.data;
  console.log(data);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/" + data.id;
    navigate(path);
  };

  return (
    <div className="ind-card" onClick={routeChange}>
      <h3>{data.name}</h3>
      <p>{data.details}</p>
      <p>
        {data.count.going} going, {data.count.invited} invited,{" "}
        {data.count.not_going} not going
      </p>
    </div>
  );
};

export default Event;
