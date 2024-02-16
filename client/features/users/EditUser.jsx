import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../ui/Form";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useChangeEmail, useChangeName, useChangePswd } from "./useUsers";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FormError } from "../../ui/FormError";
import styled from "styled-components";

const ValidationError = styled(FormError)`
  height: auto;
  width: auto;
`;

function EditUserForm() {
  const { changeName, isChangingName } = useChangeName();
  const { changeEmail, isChangingEmail } = useChangeEmail();
  const { changePswd, isChangingPswd } = useChangePswd();
  const [error, setError] = useState("");
  const { edit } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
  });

  function onChangeName(formData) {
    changeName(formData, {
      onSuccess: () => {
        navigate("/user");
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  }

  function onChangeEmail(formData) {
    changeEmail(formData, {
      onSuccess: () => {
        navigate("/auth/login");
      },
      onError: (e) => {
        setError(e.message);
      },
    });
  }

  function onChangePswd(formData) {
    changePswd(formData, {
      onSuccess: () => {
        navigate("/diaries");
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  }
  if (edit === "name") {
    return (
      <>
        <Form onSubmit={handleSubmit(onChangeName)}>
          {error.length !== 0 && <FormError>{error}</FormError>}

          {errors.fname?.message && (
            <ValidationError>{errors.fname.message}</ValidationError>
          )}
          {errors.lname?.message && (
            <ValidationError>{errors.lname.message}</ValidationError>
          )}
          <h1>Change Name</h1>
          <Input
            placeholder="First Name"
            {...register("fname", {
              required: {
                value: true,
                message: "First Name is Required",
              },
            })}
          />
          <Input
            placeholder="second name"
            {...register("lname", {
              required: {
                value: true,
                message: "Last Name is Required",
              },
            })}
          />
          <Button disabled={isChangingName}>Submit</Button>
        </Form>
      </>
    );
  } else if (edit === "email") {
    return (
      <>
        <Form onSubmit={handleSubmit(onChangeEmail)}>
          <h1>Change Email</h1>
          {error.length !== 0 && <FormError>{error}</FormError>}
          {errors.email?.message && (
            <ValidationError>{errors.email.message}</ValidationError>
          )}
          {errors.pswd?.message && (
            <ValidationError>{errors.pswd.message}</ValidationError>
          )}
          <Input
            placeholder="New Email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
            })}
          />
          <Input
            placeholder="password"
            type="password"
            {...register("pswd", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          <Button disabled={isChangingEmail}>Submit</Button>
        </Form>
      </>
    );
  } else if (edit === "pswd") {
    return (
      <>
        <Form onSubmit={handleSubmit(onChangePswd)}>
          <h1>Change Password</h1>

          {error.length !== 0 && <FormError>{error}</FormError>}
          {errors.oldPswd?.message && (
            <ValidationError>{errors.oldPswd.message}</ValidationError>
          )}
          {errors.newPswd?.message && (
            <ValidationError>{errors.newPswd.message}</ValidationError>
          )}
          {errors.confPswd?.message && (
            <ValidationError>{errors.confPswd.message}</ValidationError>
          )}

          <Input
            placeholder="Old Password"
            type="password"
            {...register("oldPswd", {
              required: {
                value: true,
                message: "All fields are required",
              },
            })}
          />
          <Input
            placeholder="New Password"
            type="password"
            {...register("newPswd", {
              required: {
                value: true,
                message: "All fields are required",
              },
            })}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            {...register("confPswd", {
              required: {
                value: true,
                message: "All fields are required",
              },
              validate: (value) => {
                return value === watch("newPswd") || "Passwords Don't Match";
              },
            })}
          />
          <Button disabled={isChangingPswd}>Submit</Button>
        </Form>
      </>
    );
  }
}

export default EditUserForm;
