import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import TenantLeases from './TenantLeases';

const Leases: React.FC = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'CRM', path: '/apps/crm/leases' },
          { label: 'Leases', path: '/apps/crm/leases', active: true },
        ]}
        title={'Leases'}
      />
      <Row>
        <Col xl={12}>
          <TenantLeases />
        </Col>
      </Row>
    </>
  );
};

export default Leases;