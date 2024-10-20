// src/pages/apps/AdminPanel/List/index.tsx

import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, Container } from "react-bootstrap";

// components
import PageTitle from "../../../../components/PageTitle";
import AdminForm from "./AdminForm";
import ManagersList from "./ManagersList";
import { APICore } from "../../../../helpers/api/apiCore";

// data
import {  managers as initialManagers, AdminItem, ManagerItem } from "./data";
import TopDisplay from "../../../../layouts/TopDisplay";

const ManagersAndAdmins = () => {
  const [admin, setAdmin] = useState([])
  const [managers] = useState<ManagerItem[]>(initialManagers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("All");
  const api = new APICore()

  const onSearchData = (value: string) => {
    setSearchTerm(value);
  };

  const filteredManagers = managers.filter((manager) =>
    manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manager.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Get = async() =>{
    try{
      const {data} = await api.get('/api/getadmin')
      if(data.result){
        setAdmin(data.data)
      }
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    Get()
  },[])



  const handleAddAdmin = (newAdmin: AdminItem) => {

  };

  const handleRemoveAdmin = (adminId: number) => {

  };

  return (
    <>
    <TopDisplay/>
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
            />
          </Col>
          <Col lg={8}>
            <ManagersList
              managers={filteredManagers}
              administrators={admin}
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