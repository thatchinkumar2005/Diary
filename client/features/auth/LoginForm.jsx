import { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import { Form } from "../../ui/Form";
import { FormError } from "../../ui/FormError";
import { Input } from "../../ui/Input";

import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin.js";
import useAuth from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [error, setError] = useState("");
  const { login, isLoggingIn } = useLogin();
  const { setAuth, auth } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.accessToken) {
      navigate("/diaries");
    }
  }, [auth, navigate]);

  function onSubmit(formData) {
    login(formData, {
      onSuccess: (respData) => {
        setAuth({ accessToken: respData.accessToken });
      },
      onError: (e) => {
        if (e.message == 400) {
          setError("all fields are required");
        } else if (e.message == 401) {
          setError("given credentials are not valid");
        } else if (e.message == 412) {
          navigate("/auth/verify");
        } else if (e.message == 500) {
          setError("Server Error");
        } else {
          setError("User couldn't be logged in");
        }
      },
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>LOGIN</h1>
        {!(error.length === 0) && <FormError>{error}</FormError>}
        <Input
          placeholder="mail"
          {...register("email", {
            onChange: () => {
              setError("");
            },
          })}
        />
        <Input
          placeholder="password"
          type="password"
          autoComplete="password"
          {...register("pswd", {
            onChange: () => {
              setError("");
            },
          })}
        />
        <Button disabled={isLoggingIn}>Submit</Button>
      </Form>
    </>
  );
}

export default LoginForm;
