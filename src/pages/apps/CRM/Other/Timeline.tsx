import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTitle from "../../../../components/PageTitle";

interface TimelineEvent {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  type: 'payment' | 'maintenance' | 'lease' | 'notification';
}

const Timeline: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      id: 1,
      date: "2024-09-01",
      time: "09:00 AM",
      title: "Rent Payment Received",
      description: "September rent payment of KES 50,000 received via Mpesa.",
      type: "payment"
    },
    {
      id: 2,
      date: "2024-08-28",
      time: "02:30 PM",
      title: "Maintenance Request Completed",
      description: "Leaky faucet in Unit 301 has been repaired.",
      type: "maintenance"
    },
    {
      id: 3,
      date: "2024-08-25",
      time: "11:15 AM",
      title: "New Tenant Move-In",
      description: "Sarah Johnson has moved into Unit 205.",
      type: "lease"
    },
    {
      id: 4,
      date: "2024-08-20",
      time: "10:00 AM",
      title: "Lease Renewal Notice",
      description: "Lease for Unit 102 is up for renewal in 30 days.",
      type: "notification"
    },
    {
      id: 5,
      date: "2024-08-15",
      time: "03:45 PM",
      title: "Property Inspection Scheduled",
      description: "Annual property inspection scheduled for September 10th.",
      type: "notification"
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <i className="mdi mdi-cash-multiple text-success"></i>;
      case 'maintenance':
        return <i className="mdi mdi-tools text-warning"></i>;
      case 'lease':
        return <i className="mdi mdi-file-document text-info"></i>;
      case 'notification':
        return <i className="mdi mdi-bell text-primary"></i>;
      default:
        return <i className="mdi mdi-information"></i>;
    }
  };

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Activity Timeline", path: "/dashboard/timeline", active: true },
        ]}
        title={"Property Activity Timeline"}
      />
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="timeline">
            <article className="timeline-item">
              <h2 className="m-0 d-none">&nbsp;</h2>
              <div className="time-show mt-0">
                <Link to="#" className="btn btn-primary width-lg">
                  Today
                </Link>
              </div>
            </article>

            {events.map((event, index) => (
              <article key={event.id} className={`timeline-item ${index % 2 === 0 ? 'timeline-item-left' : ''}`}>
                <div className="timeline-desk">
                  <div className="timeline-box">
                    <span className={index % 2 === 0 ? "arrow-alt" : "arrow"}></span>
                    <span className="timeline-icon">{getEventIcon(event.type)}</span>
                    <h4 className="mt-0 font-16">{event.title}</h4>
                    <p className="text-muted">
                      <small>{event.time}</small>
                    </p>
                    <p className="mb-0">{event.description}</p>
                    <Badge 
                      bg={
                        event.type === 'payment' ? 'success' :
                        event.type === 'maintenance' ? 'warning' :
                        event.type === 'lease' ? 'info' : 'primary'
                      }
                      className="mt-2"
                    >
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                  </div>
                </div>
              </article>
            ))}

            <article className="timeline-item">
              <h2 className="m-0 d-none">&nbsp;</h2>
              <div className="time-show">
                <Link to="#" className="btn btn-primary width-lg">
                  Earlier
                </Link>
              </div>
            </article>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Timeline;