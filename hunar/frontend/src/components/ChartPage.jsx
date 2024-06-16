import React from "react";
import ChartComponent from "./ChartComponent";

const ChartPage = ({ studentMarks, name }) => {
  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: name,
        data: studentMarks,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 3, // Thicker lines
        lineTension: 0.4, // Smoothen the lines
      },
    ],
  };

  return (
    <div>
      <h1>{name}</h1>
      <ChartComponent chartData={chartData} />
    </div>
  );
};

export default ChartPage;
