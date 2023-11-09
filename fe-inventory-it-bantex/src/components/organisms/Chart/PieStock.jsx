import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const data = {
    labels: ["Label 1", "Label 2", "Label 3"],
    datasets: [
      {
        data: [30, 40, 30], // Data untuk masing-masing bagian diagram lingkaran
        backgroundColor: ["red", "blue", "green"], // Warna untuk masing-masing bagian
      },
    ],
  };

  return (
    <div>
      <h2>Diagram Lingkaran Contoh</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
