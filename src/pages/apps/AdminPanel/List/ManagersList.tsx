// src/components/ManagersList.tsx

import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import UserCard from './UserCard';
import { ManagerItem, AdminItem } from './data';

interface ManagersListProps {
  managers: ManagerItem[];
  administrators: AdminItem[];
  showAdmins: boolean;
  showManagers: boolean;
  onRemoveAdmin: (adminId: number) => void;
}

const ManagersList: React.FC<ManagersListProps> = ({ 
  managers, 
  administrators, 
  showAdmins, 
  showManagers, 
  onRemoveAdmin 
}) => {
  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Administrators and Property Managers</h4>
        {showAdmins && (
          <>
            <h5>Administrators</h5>
            {administrators.map((admin) => (
              <div key={admin.id} className="d-flex justify-content-between align-items-center mb-2">
                <UserCard user={admin} />
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => onRemoveAdmin(admin.id)}
                  disabled={administrators.length === 1}
                >
                  Remove Access
                </Button>
              </div>
            ))}
          </>
        )}
        {showManagers && (
          <>
            <h5 className="mt-4">Property Managers</h5>
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Property</th>
                </tr>
              </thead>
              <tbody>
                {managers.map((manager) => (
                  <tr key={manager.id}>
                    <td>{manager.name}</td>
                    <td>{manager.email}</td>
                    <td>{manager.phone}</td>
                    <td>{manager.property}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ManagersList;