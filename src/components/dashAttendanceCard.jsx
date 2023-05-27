import "../styles/dashAttendanceCard.css";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AttendanceModal from "./Modal";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

const DashAttendanceCard = ({ data }) => {
  return (
    <Card className="dashAttendanceCard">
      <Card.Body className="dashAttendanCecard-body">
        <div className="attendance">
          <div className="attendance-section">
            <p className="attendance-status">Attending</p>
            <AttendanceModal type="going" data={data.count} />
            <p className="attendance-number">{data.count.attending}</p>
          </div>
          <div className="attendance-section">
            <p className="attendance-status">Not Attending</p>
            <AttendanceModal type="not going" data={data.count} />
            <p className="attendance-number">{data.count.not_attending}</p>
          </div>
          <div className="attendance-section">
            <p className="attendance-status">No Response</p>
            <AttendanceModal type="maybe" data={data.count} />
            <p className="attendance-number">{data.count.no_response}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DashAttendanceCard;
