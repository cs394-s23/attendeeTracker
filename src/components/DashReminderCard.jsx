import "../styles/dashAttendanceCard.css";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AttendanceModal from "./Modal";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

const DashReminderCard = ({ data }) => {
  // SEMI HARD CODED FOR THE FIRST EVENT
  // data = data.Events[0];
  return (
    <Card className="dashAttendanceCard">
      <Card.Body className="dashAttendanCecard-body">
        <div className="attendance">
          <div className="attendance-section">
            <p className="attendance-status">Confirmed Yes</p>
            <AttendanceModal type="going" data={data.reminder_count} />
            <p className="attendance-number">{data.reminder_count.attending}</p>
          </div>
          <div className="attendance-section">
            <p className="attendance-status">Confirmed No</p>
            <AttendanceModal type="not going" data={data.reminder_count} />
            <p className="attendance-number">
              {data.reminder_count.not_attending}
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DashReminderCard;
