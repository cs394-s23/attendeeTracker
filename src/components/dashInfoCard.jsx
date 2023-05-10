import "../styles/dashInfoCard.css";
import Card from "react-bootstrap/Card";

const DashInfoCard = ({ data }) => {
  // SEMI HARD CODED FOR THE FIRST EVENT
  // data = data.Events[0];
  var splitDate = data.time.split("-");
  console.log(splitDate);
  return (
    <Card className="dashcard">
      <Card.Body className="dashcard-body">
        <Card.Title className="dashcard-title">{data.title}</Card.Title>
        <Card.Text>
          <p>
            Date: {splitDate[0]}/{splitDate[1]}/{splitDate[2]}
          </p>
          <p>
            Time: {splitDate[3]}:{splitDate[4]}
          </p>
          <p>{data.details}</p>
        </Card.Text>
      </Card.Body>
      <Card.Img className="card-image" src="calendar.png" />
    </Card>
  );
};

export default DashInfoCard;
