import "../styles/dashChartCard.css";
import React from "react";
import Chart from "react-apexcharts";
import Card from "react-bootstrap/Card";

const DashChartCard = ({ data }) => {
  return (
    <div>
      <Card className="dashChartCard">
        <Card.Body className="dashChartCard-body">
          <React.Fragment>
            <div>
              <Chart
                type="pie"
                width={550}
                height={550}
                series={[
                  data.count.attending,
                  data.count.not_attending,
                  data.count.maybe,
                ]}
                options={{
                  labels: ["Attending", "Not Attending", "Maybe"],
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
