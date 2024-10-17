// src/pages/apps/AdminPanel/List/ManagersAndAdmins.tsx

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import AdminForm from './AdminForm';
import ManagersList from './ManagersList';
import {  managers as initialManagers, AdminItem, ManagerItem } from './data';

const ManagersAndAdmins: React.FC = () => {
  const [managers, setManagers] = useState<ManagerItem[]>(initialManagers);
  const [filterBy, setFilterBy] = useState<string>("All");

  const handleAddAdmin = (newAdmin: AdminItem) => {

  };

  const handleRemoveAdmin = (adminId: number) => {

  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Admin', path: '/admin' },
          { label: 'Managers & Admins', path: '/admin/managers-admins', active: true },
        ]}
        title={'Managers & Admins'}
      />
      <Container>
        <Row>
          <Col lg={6}>
            <AdminForm
            />
          </Col>
          <Col lg={6}>
            <ManagersList
              managers={managers}
              administrators={[]}
              showAdmins={filterBy === "All" || filterBy === "Admins"}
              showManagers={filterBy === "All" || filterBy === "Managers"}
              onRemoveAdmin={handleRemoveAdmin}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ManagersAndAdmins;