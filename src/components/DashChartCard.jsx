import "../styles/dashChartCard.css";
import React from "react";
import Chart from "react-apexcharts";

const DashChartCard = () => {
  return (
    <React.Fragment>
      <div>
        <Chart
          type="pie"
          width={1349}
          height={550}
          series={[23, 43, 50, 54, 65]}
          options={{
            labels: ["Attending", "Not Attending", "No Respond"],
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
};

export default DashChartCard;
