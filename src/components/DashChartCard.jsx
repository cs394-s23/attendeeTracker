import "../styles/dashChartCard.css";
import React from "react";
import Chart from "react-apexcharts";

const DashChartCard = () => {
  return (
    <React.Fragment>
      <div>
        <Chart
          type="pie"
          width={500}
          height={400}
          series={[100, 15, 25]}
          options={{
            labels: ["Attending", "Not Attending", "No Response"],
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
};

export default DashChartCard;
