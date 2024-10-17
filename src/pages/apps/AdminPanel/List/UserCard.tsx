import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DefaultImage from '../../../../components/DefaultImage';

interface UserCardProps {
  user: {
    _id: number;
    name: string;
    profile_image: string;
    position: string;
    email: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card className="text-center">
      <Card.Body>
        <div className="pt-2 pb-2">
          {user.profile_image ?<img
            src={user.profile_image}
            className="rounded-circle img-thumbnail avatar-xl"
            alt={user.name}
          />:
          <div className=' d-flex justify-content-center'>
          <DefaultImage username={user.name}/></div>}
          <h4 className="mt-3">
            <Link to="#" className="text-dark">
              {user.name}
            </Link>
          </h4>
          <p className="text-muted">
            {user.position} | {user.email}
          </p>
          <Button variant="primary" className="btn-sm waves-effect waves-light me-1">
            Message
          </Button>
          <Button variant="light" className="btn-sm waves-effect">
            Edit
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserCard;