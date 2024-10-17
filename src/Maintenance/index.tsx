import React from 'react';
import { Container } from 'react-bootstrap';
import PageTitle from '../components/PageTitle';
import MaintenanceDashboard from './MaintenanceDashboard';
import MaintenanceList from './MaintenanceList';

const MaintenancePage: React.FC = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Maintenance', path: '/maintenance', active: true },
        ]}
        title={'Maintenance'}
      />
      <Container>
        <MaintenanceDashboard />
        <MaintenanceList />
      </Container>
    </>
  );
};

export default MaintenancePage;