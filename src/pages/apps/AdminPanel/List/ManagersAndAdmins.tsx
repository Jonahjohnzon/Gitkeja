// src/pages/apps/AdminPanel/List/ManagersAndAdmins.tsx

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import AdminForm from './AdminForm';
import ManagersList from './ManagersList';
import { administrators as initialAdmins, managers as initialManagers, AdminItem, ManagerItem } from './data';

const ManagersAndAdmins: React.FC = () => {
  const [administrators, setAdministrators] = useState<AdminItem[]>(initialAdmins);
  const [managers, setManagers] = useState<ManagerItem[]>(initialManagers);
  const [filterBy, setFilterBy] = useState<string>("All");

  const handleAddAdmin = (newAdmin: AdminItem) => {
    if (administrators.length < 3) {
      setAdministrators([...administrators, newAdmin]);
    } else {
      alert("Maximum of 2 additional administrators allowed.");
    }
  };

  const handleRemoveAdmin = (adminId: number) => {
    if (administrators.length > 1) {
      setAdministrators(administrators.filter(admin => admin.id !== adminId));
    } else {
      alert("Cannot remove the last administrator.");
    }
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
              administrators={administrators}
              onAddAdmin={handleAddAdmin}
            />
          </Col>
          <Col lg={6}>
            <ManagersList
              managers={managers}
              administrators={administrators}
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