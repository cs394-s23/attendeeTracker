import NavBar from "./NavBar"
const Dashboard = () => {
    return (
        <div>
            <NavBar />
            <h1>Data Science Event</h1>
            <div className="information">
                <h3>Date: </h3>
                <h3>Time: </h3>
                <h3>Contact: </h3>
                <h3>Details: </h3>
            </div>
            <div className="participants">
                <h2>Going:</h2>
                <h4>10</h4>
                <h2>Not Going:</h2>
                <h4>1</h4>
                <h2>No Response:</h2>
                <h4>14</h4>
            </div>
            <div className="analytics">
                <h2>Response Rate:</h2>

                <h2>Graph:</h2>

            </div>
            <div className="reminder">
                <button>Send Reminder</button>
            </div>



        </div>
    )
}


export default Dashboard