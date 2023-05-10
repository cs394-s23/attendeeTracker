import "../styles/dashChartCard.css";
import React from "react";
import Chart from "react-apexcharts";
import Card from "react-bootstrap/Card";

const DashChartCard = ({ data }) => {
  // SEMI HARD CODED FOR THE FIRST EVENT
  // const {
  //   params: { personId },
  // } = match;
  // data = data.Events[0];
  return (
    <div>
      <Card className="dashcard">
        <Card.Body className="dashcard-body">
          <Card.Title className="dashcard-title">Statistics</Card.Title>
          <React.Fragment>
            <div>
              <Chart
                type="pie"
                width={550}
                height={550}
                series={[
                  data.count.attending,
                  data.count.not_attending,
                  data.count.no_response,
                ]}
                options={{
                  labels: ["Attending", "Not Attending", "No Response"],
                }}
              ></Chart>
            </div>
          </React.Fragment>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashChartCard;
