import React, { useEffect } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { Navigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

// actions
import { resetAuth, loginUser } from "../../redux/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";

interface UserData {
  email: string;
  password: string;
}

/* bottom links */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p>
          <Link to={"/auth/forget-password"} className="text-white-50 ms-1">
            {t("Forgot your password?")}
          </Link>
        </p>
      </Col>
    </Row>
  );
};



const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { user, userLoggedIn, loading, error } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
    })
  );

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
  form validation schema
  */
  const schemaResolver = yupResolver(
    yup.object().shape({
      email: yup.string().email().required(t("Please enter Email")),
      password: yup.string().required(t("Please enter Password")),
    })
  );

  /*
  handle form submission
  */
  const onSubmit = (formData: UserData) => {
    dispatch(loginUser(formData["email"], formData["password"]));
  };

  const location = useLocation();
  //
  // const redirectUrl = location.state && location.state.from ? location.state.from.pathname : '/';
  const redirectUrl = location?.search?.slice(6) || "/";

  return (
    <>
      {(userLoggedIn || user) && <Navigate to={redirectUrl}></Navigate>}

      <AuthLayout
        helpText={t(
          "Enter your email address and password to access admin panel."
        )}
        bottomLinks={<BottomLink />}
      >
        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{ email: "", password: "" }}
        >
          <FormInput
            label={t("Email")}
            type="email"
            name="email"
            placeholder="Enter your Email"
            containerClass={"mb-3"}
          />
          <FormInput
            label={t("Password")}
            type="password"
            name="password"
            placeholder="Enter your password"
            containerClass={"mb-3"}
          ></FormInput>

          <div className="text-center d-grid">
            <Button variant="primary" type="submit" disabled={loading}>
              {t("Log In")}
            </Button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default Login;
