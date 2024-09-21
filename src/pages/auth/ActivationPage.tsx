import React, { useState, useEffect } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// actions
import { activateUser } from "../../redux/actions";

import AuthLayout from "./AuthLayout";

/* bottom links */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-white-50">
          {t("Already have an account?")}{" "}
          <Link to={"/auth/login"} className="text-white ms-1">
            <b>{t("Sign In")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const ActivationPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [activationStatus, setActivationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const { loading, error, activationSuccess } = useSelector((state: any) => ({
    loading: state.Auth.loading,
    error: state.Auth.error,
    activationSuccess: state.Auth.activationSuccess,
  }));

  useEffect(() => {
    if (activationSuccess) {
      setActivationStatus('success');
      setTimeout(() => navigate('/auth/login'), 3000);
    } else if (error) {
      setActivationStatus('error');
    }
  }, [activationSuccess, error, navigate]);

  const handleActivation = () => {
    if (token) {
      dispatch(activateUser(token) as any);
    } else {
      setActivationStatus('error');
    }
  };

  return (
    <AuthLayout
      helpText={t("Click the button below to activate your account.")}
      bottomLinks={<BottomLink />}
    >
      {activationStatus === 'error' && (
        <Alert variant="danger" className="my-2">
          {t("Activation failed. Please try again.")}
        </Alert>
      )}

      {activationStatus === 'success' && (
        <Alert variant="success" className="my-2">
          {t("Your account has been successfully activated!")}
        </Alert>
      )}

      <div className="text-center">
        <Button 
          variant="primary" 
          onClick={handleActivation} 
          disabled={loading || activationStatus !== 'idle'}
        >
          {loading ? t("Activating...") : t("Activate Account")}
        </Button>
      </div>
    </AuthLayout>
  );
};

export default ActivationPage;