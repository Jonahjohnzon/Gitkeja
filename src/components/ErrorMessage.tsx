import React from 'react';
import { Alert } from 'react-bootstrap';

interface ErrorMessageProps {
  message: string;
  variant?: 'danger' | 'warning' | 'info';
  dismissible?: boolean;
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  variant = 'danger',
  dismissible = true,
  onDismiss
}) => {
  return (
    <Alert variant={variant} dismissible={dismissible} onClose={onDismiss}>
      <Alert.Heading>Error</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

export default ErrorMessage;