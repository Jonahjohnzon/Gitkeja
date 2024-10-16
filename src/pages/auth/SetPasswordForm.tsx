import React, { useState } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { APICore } from "../../helpers/api/apiCore";

// actions
//import { setPassword } from "../../redux/auth/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";
import AuthLayout from "./AuthLayout";
import { S } from "react-ladda-button";

interface PasswordData {
  newPassword: string;
  confirmPassword: string;
}



const SetPasswordForm: React.FC = () => {
  const {token} = useParams()
  const api = new APICore()
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState()
  const [error, setError] = useState()


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

  const onSubmit = async (formData: PasswordData) => {
    try{
      setLoading(true)
      if(token)
      {
      const {data} = await api.create('/api/passwordCreation',{
        token,
        password:formData['newPassword']
      })
      if(data.result)
      {

        setSuccess(data.message)
        console.log(data)
      }
      else{
        setError(data.message)
      }
      setLoading(false)
    }
    }
    catch(error)
    {
      console.log(error)
      setLoading(false)
    }
  };
  return (
    <AuthLayout
    helpText={t("Click the button below to activate your account.")}
  >
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
    </></AuthLayout>
  );
};

export default SetPasswordForm;