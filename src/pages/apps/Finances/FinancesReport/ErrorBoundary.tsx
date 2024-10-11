import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Alert variant="danger">Something went wrong. Please try again later.</Alert>;
    }

    return this.props.children;
  }
}

export const LoadingSpinner: React.FC = () => (
  <div className="text-center">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default ErrorBoundary;