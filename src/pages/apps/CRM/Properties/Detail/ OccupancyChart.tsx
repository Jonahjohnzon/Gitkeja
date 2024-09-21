import React, { useState, useEffect } from "react";
import { Card, Dropdown } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface OccupancyChartProps {
  propertyId: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}

const OccupancyChart: React.FC<OccupancyChartProps> = ({ propertyId }) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: []
  });
  const [timeRange, setTimeRange] = useState<'6months' | '1year' | '2years'>('1year');

  useEffect(() => {
    // In a real application, this data would be fetched from an API
    const fetchOccupancyData = () => {
      const months = timeRange === '6months' ? 6 : timeRange === '1year' ? 12 : 24;
      const labels = Array.from({ length: months }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (months - 1 - i));
        return d.toLocaleString('default', { month: 'short', year: '2-digit' });
      });

      const occupancyData = Array.from({ length: months }, () => Math.floor(Math.random() * (100 - 70 + 1) + 70));
      const rentCollectionData = Array.from({ length: months }, () => Math.floor(Math.random() * (100 - 80 + 1) + 80));

      setChartData({
        labels,
        datasets: [
          {
            label: 'Occupancy Rate',
            data: occupancyData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.1
          },
          {
            label: 'Rent Collection Rate',
            data: rentCollectionData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.1
          }
        ]
      });
    };

    fetchOccupancyData();
  }, [propertyId, timeRange]);

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Occupancy and Rent Collection Rates',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Percentage (%)'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setTimeRange('6months')}>Last 6 Months</Dropdown.Item>
            <Dropdown.Item onClick={() => setTimeRange('1year')}>Last 1 Year</Dropdown.Item>
            <Dropdown.Item onClick={() => setTimeRange('2years')}>Last 2 Years</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Export Data</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Occupancy Overview</h4>
        <div className="chart-container" style={{ height: '320px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="mt-3 text-center">
          <span className="me-3">
            <i className="mdi mdi-checkbox-blank-circle text-info me-1"></i>
            Current Occupancy: {chartData.datasets[0]?.data.slice(-1)[0]}%
          </span>
          <span>
            <i className="mdi mdi-checkbox-blank-circle text-danger me-1"></i>
            Current Rent Collection: {chartData.datasets[1]?.data.slice(-1)[0]}%
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OccupancyChart;