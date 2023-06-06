import "../styles/dashInfoCard.css";
import Card from "react-bootstrap/Card";
import { addReminder } from "../utilities/googleFormApi";
import { trySampleRequest } from "../utilities/googleFormApi";
import Button from "react-bootstrap/Button";
import { sendEmail } from "./Reminder";
const DashInfoCard = ({ data }) => {
  const sendReminder = (e) => {
    e.preventDefault();
    //first check if question is already sent
    if (!data.hasOwnProperty("reminder_count")) {
      addReminder(data.formId).then((result) => {
        refreshData();
      });
    } else {
      refreshData();
    }

    sendEmail(data.responderUri, data.count.totalList, data.name).then(() => {
      // window.location.reload(false);
    });
  };

  const refreshData = (e) => {
    console.log(data);
    var formId = data.formId;
    console.log(data.key);
    trySampleRequest(formId, true, null, true, data.key);
  };

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
        <div id="buttons">
          <Button variant="primary" onClick={sendReminder} className="button">
            Send Reminder
          </Button>
          <Button variant="primary" onClick={refreshData}>
            Refresh Data
          </Button>
        </div>
      </Card.Body>
      <Card.Img className="dashInfoCard-image" src="calendar.png" />
    </Card>
  );
};

export default DashInfoCard;
