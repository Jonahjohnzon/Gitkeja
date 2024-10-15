import React from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

// actions
//import { setPassword } from "../../redux/auth/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";

interface PasswordData {
  newPassword: string;
  confirmPassword: string;
}

interface SetPasswordFormProps {
  token: string;
}

const SetPasswordForm: React.FC<SetPasswordFormProps> = ({ token }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, success } = useSelector(
    (state: RootState) => ({
      loading: state.Auth.loading,
      error: state.Auth.error,
      success: state.Auth.success,
    })
  );

  const schemaResolver = yupResolver(
    yup.object().shape({
      newPassword: yup
        .string()
        .required(t("Please enter a new password"))
        .min(8, t("Password must be at least 8 characters long"))
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          t("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        ),
      confirmPassword: yup
        .string()
        .required(t("Please confirm your password"))
        .oneOf([yup.ref("newPassword"), null], t("Passwords must match")),
    })
  );

  const onSubmit = (formData: PasswordData) => {
    //dispatch(setPassword(formData.newPassword, token));
  };
  return (
    <>
      {error && (
        <Alert variant="danger" className="my-2">
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="my-2">
          {t("Password successfully set!")}
        </Alert>
      )}

         <VerticalForm<PasswordData>
        onSubmit={onSubmit}
        resolver={schemaResolver}
        defaultValues={{ newPassword: "", confirmPassword: "" }}
      >
        <FormInput
          label={t("New Password")}
          type="password"
          name="newPassword"
          placeholder={t("Enter your new password")}
          containerClass={"mb-3"}
        />
        <FormInput
          label={t("Confirm Password")}
          type="password"
          name="confirmPassword"
          placeholder={t("Confirm your new password")}
          containerClass={"mb-3"}
        />

        <div className="text-center d-grid">
          <Button variant="primary" type="submit" disabled={loading}>
            {t("Set Password")}
          </Button>
        </div>
      </VerticalForm>
    </>
  );
};

export default SetPasswordForm;