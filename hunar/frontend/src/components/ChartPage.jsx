import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

// Register the required components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const ChartComponent = ({ chartData }) => (
  <Line data={chartData} options={chartData.options} />
);

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
    options: {
      responsive: true,
      plugins: {
        annotation: {
          annotations: {
            line1: {
              type: "line",
              xMin: 2.5,
              xMax: 2.5,
              borderColor: "rgba(255, 99, 132, 0.8)",
              borderWidth: 1,
              label: {
                enabled: false,
              },
            },
            line2: {
              type: "line",
              xMin: 5.5,
              xMax: 5.5,
              borderColor: "rgba(255, 99, 132, 0.8)",
              borderWidth: 1,
              label: {
                enabled: false,
              },
            },
            line3: {
              type: "line",
              xMin: 8.5,
              xMax: 8.5,
              borderColor: "rgba(255, 99, 132, 0.8)",
              borderWidth: 1,
              label: {
                enabled: false,
              },
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              // Access the dataset and the value
              const dataset = tooltipItem.dataset;
              const value = dataset.data[tooltipItem.dataIndex];
              return `${dataset.label}: ${value}`;
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  };

  return (
    <div className="chart-page">
      <h1>{name}</h1>
      <ChartComponent chartData={chartData} />
    </div>
  );
};

export default ChartPage;
