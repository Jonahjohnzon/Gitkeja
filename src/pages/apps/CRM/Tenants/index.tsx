import React, { useState, useCallback } from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../../components/PageTitle";
import TenantsListView from "./TenantsListView";
import Profile from "./Profile";
import AddTenant from "./AddTentant";

// dummy data
import { tenants, TenantDetails } from "./data";

const Tenants: React.FC = () => {
  const [tenantsData, setTenantsData] = useState<TenantDetails[]>(tenants);
  const [selectedTenant, setSelectedTenant] = useState<TenantDetails | null>(null);
  const [showAddTenant, setShowAddTenant] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    setShowAddTenant(prev => !prev);
  }, []);

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

      <Row>
        <Col lg={12} xl={9}>
          <TenantsListView 
            tenantDetails={tenantsData} 
            onTenantSelect={handleTenantSelect}
            onAddTenant={toggleAddTenantModal}
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
      />

      {isLoading && <div className="text-center">Loading...</div>}
    </>
  );
};

export default Tenants;