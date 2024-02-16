import { Button } from "../../ui/Button";
import { Form as BaseForm } from "../../ui/Form";
import { Input } from "../../ui/Input";
import { useForm } from "react-hook-form";
import useRegister from "./useRegister";
import { FormError } from "../../ui/FormError";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Form = styled(BaseForm)`
  height: 700px;
`;
const ValidationError = styled(FormError)`
  height: auto;
  width: auto;
  padding: 1%;
`;

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const { registerUser, isRegistering } = useRegister();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function onSubmit(formData) {
    registerUser(formData, {
      onSuccess: () => {
        navigate("/auth/verify", { replace: true });
      },
      onError: (e) => {
        if (e.message == 409) {
          setError("User already exists");
        }
      },
    });
  }
  if (isRegistering) {
    return <h1>Registering</h1>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>SIGN IN</h1>
      {!(error.length === 0) && <FormError>{error}</FormError>}

      {errors.username?.message && (
        <ValidationError>{errors.username?.message}</ValidationError>
      )}
      {errors.pswd?.message && (
        <ValidationError>{errors.pswd?.message}</ValidationError>
      )}
      {errors.fname?.message && (
        <ValidationError>{errors.fname?.message}</ValidationError>
      )}
      {errors.email?.message && (
        <ValidationError>{errors.email?.message}</ValidationError>
      )}

      <Input
        placeholder="username"
        {...register("username", {
          required: {
            value: true,
            message: "username is required",
          },
          pattern: {
            value:
              /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/,
            message: "Enter a valid Username",
          },
          onChange: () => {
            setError("");
          },
        })}
      />

      <Input
        placeholder="password"
        type="password"
        {...register("pswd", {
          required: {
            value: true,
            message: "password is required",
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message:
              "password should contain Minimum eight characters, at least one letter and one number",
          },
          onChange: () => {
            setError("");
          },
        })}
      />

      <Input
        placeholder="first name"
        {...register("fname", {
          required: {
            value: true,
            message: "First Name is required",
          },
        })}
      />

      <Input placeholder="last name" {...register("lname")} />

      <Input
        placeholder="email"
        {...register("email", {
          required: {
            value: true,
            message: "Email is Required",
          },
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Enter a valid Email",
          },
          onChange: () => {
            setError("");
          },
        })}
      />

      <Button disabled={isRegistering}>Submit</Button>
    </Form>
  );
}

export default RegisterForm;
