"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any }[];
  angleField: string;
  colorField: string;
  height?: number;
}

export function PieChart({ data, angleField, colorField, height = 300 }: PieChartProps) {
  const chartData = {
    labels: data.map((item) => item[colorField]),
    datasets: [
      {
        data: data.map((item) => item[angleField]),
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height }}>
      <Pie data={chartData} />
    </div>
  );
}