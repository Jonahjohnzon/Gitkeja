import React from 'react';
import { Card } from 'react-bootstrap';
import CountUp from 'react-countup';

interface TrendInfo {
  label: string;
  value: string;
  icon: string;
  variant: 'success' | 'warning' | 'danger' | 'info';
}

interface CountUpOptions {
  suffix?: string;
  prefix?: string;
  separator?: string;
  decimals?: number;
  duration?: number;
}

interface StatisticsWidget3Props {
  title: string;
  stats: string;
  trend: TrendInfo;
  counterOptions?: CountUpOptions;
}

const StatisticsWidget3: React.FC<StatisticsWidget3Props> = ({
  title,
  stats,
  trend,
  counterOptions = {}
}) => {
  const {
    suffix = '',
    prefix = '',
    separator = ',',
    decimals = 0,
    duration = 3
  } = counterOptions;

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mt-0 mb-4">{title}</h4>
        <div className="widget-chart-1">
          <div className="widget-chart-box-1 float-start" dir="ltr">
            <i className={`${trend.icon} widget-icon bg-${trend.variant} rounded-circle`}></i>
          </div>
          <div className="widget-detail-1 text-end">
            <h2 className="fw-normal pt-2 mb-1">
              <CountUp
                end={parseFloat(stats)}
                suffix={suffix}
                prefix={prefix}
                separator={separator}
                decimals={decimals}
                duration={duration}
              />
            </h2>
            <p className="text-muted mb-1">{trend.label}</p>
          </div>
        </div>
        <div className={`text-${trend.variant}`}>
          {trend.value}{' '}
          <i className={`${trend.icon === 'mdi mdi-arrow-up-bold' ? 'mdi mdi-arrow-up-bold' : 'mdi mdi-arrow-down-bold'}`}></i>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatisticsWidget3;