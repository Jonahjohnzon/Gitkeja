import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface MaintenanceRequestsChartProps {
  requests: any;
}

const MaintenanceRequestsChart: React.FC<MaintenanceRequestsChartProps> = ({ requests }) => {
  const req = requests.getMaintenance
  const statusCounts = req?.reduce((acc:any, request:any) => {
    acc[request.status] = (acc[request.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityCounts = req?.reduce((acc:any, request:any) => {
    acc[request.priority] = (acc[request.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'donut',
    },
    labels: ['Open', 'In Progress', 'Closed'],
    series: [statusCounts['Open'] || 0, statusCounts['In Progress'] || 0, statusCounts['Closed'] || 0],
    colors: ['#FF4560', '#FEB019', '#00E396'],
    legend: {
      position: 'bottom'
    },
    title: {
      text: 'Maintenance Requests Status',
      align: 'center',
      style: {
        fontSize: '18px'
      }
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
            <Dropdown.Item>View All Requests</Dropdown.Item>
            <Dropdown.Item>Export Data</Dropdown.Item>
            <Dropdown.Item>Generate Report</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h4 className="header-title mb-3">Maintenance Requests</h4>
        <Chart
          options={chartOptions}
          series={chartOptions.series}
          type="donut"
          height={350}
        />
        <div className="mt-3">
          <h5>Priority Breakdown:</h5>
          <p>High: {priorityCounts['High'] || 0}</p>
          <p>Medium: {priorityCounts['Medium'] || 0}</p>
          <p>Low: {priorityCounts['Low'] || 0}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MaintenanceRequestsChart;