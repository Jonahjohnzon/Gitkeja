import React, { useState, useCallback, useEffect } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

// components
import PageTitle from "../../../../components/PageTitle";
import TenantsListView from "./TenantsListView";
import Profile from "./Profile";
import AddTenant from "./AddTentant"; 

// dummy data
import { tenants, TenantDetails } from "./data";

interface Property {
  id: number;
  name: string;
}

const Tenants: React.FC = () => {
  const navigate = useNavigate();
  const [tenantsData, setTenantsData] = useState<TenantDetails[]>(tenants);
  const [selectedTenant, setSelectedTenant] = useState<TenantDetails | null>(null);
  const [showAddTenant, setShowAddTenant] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        // Simulating an API call to fetch properties
        const response = await new Promise<Property[]>((resolve) => {
          setTimeout(() => {
            resolve([
              { id: 1, name: 'Property 1' },
              { id: 2, name: 'Property 2' },
              // Add more properties as needed
            ]);
          }, 1000);
        });
        setProperties(response);
      } catch (err) {
        setError("Failed to fetch properties. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleTenantSelect = useCallback((tenant: TenantDetails) => {
    setSelectedTenant(tenant);
  }, []);

  const handleAddTenant = useCallback((newTenant: TenantDetails) => {
    setIsLoading(true);
    setError(null);

    // Simulating an API call
    setTimeout(() => {
      try {
        // In a real application, you would add the new tenant to your backend
        // and then update the local state with the response
        const updatedTenants = [...tenantsData, { ...newTenant, id: tenantsData.length + 1 }];
        setTenantsData(updatedTenants);
        setShowAddTenant(false);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to add new tenant. Please try again.");
        setIsLoading(false);
      }
    }, 1000);
  }, [tenantsData]);

  const toggleAddTenantModal = useCallback(() => {
    if (properties.length === 0) {
      // Redirect to property creation page
      navigate('/apps/projects/create');
    } else {
      setShowAddTenant(prev => !prev);
    }
  }, [properties, navigate]);

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "CRM", path: "/apps/crm/tenants" },
          { label: "Tenants", path: "/apps/crm/tenants", active: true },
        ]}
        title={"Tenant Management"}
      />

      {properties.length === 0 && (
        <Alert variant="warning">
          No properties found. Please <Alert.Link onClick={() => navigate('/apps/projects/create')}>add a property</Alert.Link> before adding tenants.
        </Alert>
      )}

      <Row>
        <Col lg={12} xl={9}>
          <TenantsListView 
            tenantDetails={tenantsData}
            onTenantSelect={handleTenantSelect}
            onAddTenant={toggleAddTenantModal}
            properties={properties}
          />
        </Col>
        <Col lg={12} xl={3}>
          {selectedTenant ? (
            <Profile tenantDetails={selectedTenant} />
          ) : (
            <div className="alert alert-info">Select a tenant to view their profile</div>
          )}
        </Col>
      </Row>

      <AddTenant 
        show={showAddTenant}
        onHide={toggleAddTenantModal}
        onSubmit={handleAddTenant}
        properties={properties}
      />

      {isLoading && <div className="text-center">Loading...</div>}
    </>
  );
};

export default Tenants;