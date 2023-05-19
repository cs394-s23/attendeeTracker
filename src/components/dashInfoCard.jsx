import "../styles/dashInfoCard.css";
import Card from "react-bootstrap/Card";

const DashInfoCard = ({ data }) => {
  // SEMI HARD CODED FOR THE FIRST EVENT
  // data = data.Events[0];
  var splitDate = data.time.split("-");
  console.log(splitDate);
  return (
    <Card className="dashInfoCard">
      <Card.Body className="dashInfoCard-body">
        <Card.Text className="dashInfoCard-text-section">
          <p>
            Date: {splitDate[0]}/{splitDate[1]}/{splitDate[2]}
          </p>
          <p>
            Time: {splitDate[3]}:{splitDate[4]}
          </p>
          <p>{data.details}</p>
        </Card.Text>
      </Card.Body>
      <Card.Img className="dashInfoCard-image" src="calendar.png" />
    </Card>
  );
};

export default DashInfoCard;
