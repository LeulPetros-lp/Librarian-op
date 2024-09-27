import React from "react";
import Chart, { Props } from "react-apexcharts";

const state: Props["series"] = [
  {
    name: "Borrowed",
    data: [5,6,7,8,6,0,0],
  },
  {
    name: "Red Zone",
    data: [2,5,3,4,6,0,0],
  },
];

const options: Props["options"] = {
  chart: {
    type: "area",
    animations: {
      easing: "linear",
      speed: 300,
    },
    sparkline: {
      enabled: false,
    },
    brush: {
      enabled: false,
    },
    id: "basic-bar",
    foreColor: "hsl(var(--nextui-default-800))",
    stacked: true,
    toolbar: {
      show: false,
    },
  },

  xaxis: {
    categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saterday", "Sunday"],
    labels: {
      style: {
        colors: "hsl(var(--nextui-default-800))",
      },
    },
    axisBorder: {
      color: "hsl(var(--nextui-nextui-default-200))",
    },
    axisTicks: {
      color: "hsl(var(--nextui-nextui-default-200))",
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "hsl(var(--nextui-default-800))",
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: true,
    borderColor: "hsl(var(--nextui-default-200))",
    strokeDashArray: 0,
    position: "back",
  },
  stroke: {
    curve: "smooth",
  },
  // Define colors for each series
  colors: ["#00CA51", "#FE0707"],
  // @ts-ignore
  markers: false,
};

export const Steam = () => {
  return (
    <>
      <div className="w-full z-20">
        <div id="chart">
          <Chart options={options} series={state} type="area" height={425} />
        </div>
      </div>
    </>
  );
};
