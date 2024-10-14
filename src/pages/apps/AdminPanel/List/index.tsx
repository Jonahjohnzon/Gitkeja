// src/pages/apps/AdminPanel/List/index.tsx

import React, { useState } from "react";
import { Card, Row, Col, Form, Container } from "react-bootstrap";

// components
import PageTitle from "../../../../components/PageTitle";
import AdminForm from "./AdminForm";
import ManagersList from "./ManagersList";

// data
import { administrators as initialAdmins, managers as initialManagers, AdminItem, ManagerItem } from "./data";

const ManagersAndAdmins = () => {
  const [administrators, setAdministrators] = useState<AdminItem[]>(initialAdmins);
  const [managers] = useState<ManagerItem[]>(initialManagers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("All");

  const onSearchData = (value: string) => {
    setSearchTerm(value);
  };

  const filteredManagers = managers.filter((manager) =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdmins = administrators.filter((admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          { label: "Admin", path: "/admin" },
          { label: "Managers & Admins", path: "/admin/managers-admins", active: true },
        ]}
        title={"Managers & Admins"}
      />

      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row className="mb-2">
                  <Col sm={4}>
                    <Form.Group>
                      <Form.Control
                        type="search"
                        placeholder="Search..."
                        onChange={(e) => onSearchData(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={4}>
                    <Form.Group>
                      <Form.Select
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                      >
                        <option value="All">All</option>
                        <option value="Admins">Administrators</option>
                        <option value="Managers">Property Managers</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={4}>
            <AdminForm
              administrators={administrators}
              onAddAdmin={handleAddAdmin}
            />
          </Col>
          <Col lg={8}>
            <ManagersList
              managers={filteredManagers}
              administrators={filteredAdmins}
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