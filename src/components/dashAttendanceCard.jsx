import "../styles/dashAttendanceCard.css"
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'





const DashAttendanceCard = ( { data } ) => {
    // SEMI HARD CODED FOR THE FIRST EVENT
    data = data.Events[0];
    return (
        
        <Card className="dashAttendanceCard">
            <Card.Body className="dashAttendanCecard-body">
                <div className="attendance">
                    <div className="attendance-section">
                        <p className="attendance-status">Attending</p>
                        <FontAwesomeIcon icon={faCircleCheck} className="attendance-icon fa-4x" style={{color: "green"}}/>
                        <p className="attendance-number">{data.count.attending}</p>
                    </div>
                    <div className="attendance-section">
                        <p className="attendance-status">Not Attending</p>
                        <FontAwesomeIcon icon={faCircleXmark} className="attendance-icon fa-4x" style={{color: "#FF5733"}}/>
                        <p className="attendance-number">{data.count.not_attending}</p>
                    </div>
                    <div className="attendance-section">
                        <p className="attendance-status">No Response</p>
                        <FontAwesomeIcon icon={faCircleQuestion} className="attendance-icon fa-4x" style={{color: "#FFB733"}}/>
                        <p className="attendance-number">{data.count.no_response}</p>
                    </div>
                </div>
            </Card.Body>
        

        </Card>
    )
    


}

export default DashAttendanceCard;