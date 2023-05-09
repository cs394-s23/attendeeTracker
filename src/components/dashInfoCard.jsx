import "../styles/dashInfoCard.css"
import Card from 'react-bootstrap/Card';


const DashInfoCard = () => {

    return (
        
        <Card className="dashcard">
            

            <Card.Body className="dashcard-body">
                <Card.Title className="dashcard-title">Data Science Event</Card.Title>
                <Card.Text>
                    <p>Event Date, Event Time</p>
                    <p>Short description of event. This description also might be long, so let's make it a little longer to test it out.</p>
                </Card.Text>
            </Card.Body>
            <Card.Img className="card-image" src="public/calendar.png"/>

        </Card>
    )
    


}

export default DashInfoCard;