import React from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";
import { ApexOptions } from "apexcharts";



interface Dashboard {
  rentalIncome:number[],
  occupancyRates:number[]
}

interface StatisticsProps {
  dashboard: Dashboard; // match prop name with lowercased 'dashboard'
}
const OccupancyTrends = ({dashboard}:StatisticsProps) => {
  // Simulated data - replace with actual data from your backend
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const rentalIncome = dashboard.rentalIncome;
  const occupancyRates = dashboard.occupancyRates;
  const apexOpts: ApexOptions = {
    chart: {
      height: 378,
      type: "line",
      zoom: {
        enabled: false
      },
    },
    stroke: {
      curve: "smooth",
      width: [0, 3]
    },
    plotOptions: {
      bar: {
        columnWidth: "50%"
      }
    },
    colors: ["#1abc9c", "#4a81d4"],
    series: [
      {
        name: "Rental Income",
        type: "column",
        data: rentalIncome
      },
      {
        name: "Occupancy Rate",
        type: "line",
        data: occupancyRates
      }
    ],
    fill: {
      opacity: [0.85, 1],
    },
    labels: months,
    markers: {
      size: 0
    },
    xaxis: {
      type: "category"
    },
    yaxis: [
      {
        title: {
          text: "Rental Income ($)",
        },
      },
      {
        opposite: true,
        title: {
          text: "Occupancy Rate (%)"
        },
        min: 80,
        max: 100
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + (y === occupancyRates[0] ? "%" : "$");
          }
          return y;
        }
      }
    },
    grid: {
      borderColor: "#f1f3fa"
    },
    legend: {
      offsetY: 7,
    }
  };

  return (
    <Card>
      <Card.Body>
        <div className="float-end d-none d-md-inline-block">
          <div className="btn-group mb-2">
            <button type="button" className="btn btn-xs btn-secondary">Monthly</button>
          </div>
        </div>
        <h4 className="header-title mb-3">Occupancy Trends</h4>
        <div dir="ltr">
          <Chart
            options={apexOpts}
            series={apexOpts.series}
            type="line"
            height={380}
            className="apex-charts"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default OccupancyTrends;