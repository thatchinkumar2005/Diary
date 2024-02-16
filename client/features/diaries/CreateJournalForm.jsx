import { Form as BaseForm } from "../../ui/Form";
import styled from "styled-components";
import { TextArea } from "../../ui/TextArea";
import { Input } from "../../ui/Input";
import { Calendar } from "../../ui/Calendar";
import { Button } from "../../ui/Button";
import { FormError } from "../../ui/FormError";
import { useForm } from "react-hook-form";
import { useCreateJournal } from "./useDiaries";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Form = styled(BaseForm)`
  height: 1000px;
  width: 1100px;
  margin-top: 4%;
`;

const ValidationError = styled(FormError)`
  height: auto;
  width: auto;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 20px;
`;

function CreateJournalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const { create, isCreating } = useCreateJournal();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const date = new Date();

  function onSubmit(formData) {
    create(formData, {
      onSuccess: () => {
        navigate("/diaries");
      },
      onError: (err) => {
        if (err.message === 500) {
          setError("Couldn't be added!");
        }
      },
    });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {!(error.length === 0) && <FormError>{error}</FormError>}
      {errors.title?.message && (
        <ValidationError>{errors.title?.message}</ValidationError>
      )}
      {errors.content?.message && (
        <ValidationError>{errors.content?.message}</ValidationError>
      )}
      <h1>New Journal</h1>
      <InputContainer>
        <Calendar
          {...register("created")}
          defaultValue={`${date.getFullYear()}-${
            date.getMonth() + 1 < 10
              ? `0${date.getMonth() + 1}`
              : date.getMonth() + 1
          }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`}
        />
        <Input
          {...register("title", {
            required: { value: true, message: "Title Required" },
          })}
        />
      </InputContainer>
      <TextArea
        {...register("content", {
          required: { value: true, message: "Content Required" },
        })}
      />
      <Button disabled={isCreating}>Submit</Button>
    </Form>
  );
}

export default CreateJournalForm;
