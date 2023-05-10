import "../styles/dashAttendanceCard.css";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

const sendReminders = () => {
    console.log('here');
}
const DashAttendanceCard = () => {

  return (
    <Card className="dashAttendanceCard">
      <Card.Body className="dashAttendanCecard-body">
        <div className="attendance">
          <div className="attendance-section">
            <p className="attendance-status">Attending</p>
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="attendance-icon fa-4x"
              style={{ color: "green" }}
            />
            <p className="attendance-number">100</p>
          </div>
          <div className="attendance-section">
            <p className="attendance-status">Not Attending</p>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="attendance-icon fa-4x"
              style={{ color: "#FF5733" }}
            />
            <p className="attendance-number">15</p>
          </div>
          <div className="attendance-section">
            <p className="attendance-status">No Response</p>
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="attendance-icon fa-4x"
              style={{ color: "#FFB733" }}
            />
            <p className="attendance-number">25</p>
          </div>
        </div>
       
          <button className = "reminderButton" onClick = {sendReminders}> Send Reminders </button>
    
      </Card.Body>
    </Card>
  );
};

export default DashAttendanceCard;
