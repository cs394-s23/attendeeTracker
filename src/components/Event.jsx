import "../styles/Event.css";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { trySampleRequest } from "../utilities/googleFormApi";

const Event = (data, key) => {
  data = data.data;

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/" + data.key;
    var formId = data.formId;
    trySampleRequest(formId, true, null, true, data.key);
    navigate(path);
  };

  return (
    <Card className="event-card" onClick={routeChange}>
      <Card.Body>
        <h3>{data.name}</h3>
        <p>{data.details}</p>
        <p>
          {data.count.attending} attending, {data.count.maybe} maybe,{" "}
          {data.count.not_attending} not attending
        </p>
      </Card.Body>
    </Card>
  );
};

export default Event;
