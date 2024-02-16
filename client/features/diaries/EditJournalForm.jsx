import { Form as BaseForm } from "../../ui/Form";
import styled from "styled-components";
import { TextArea } from "../../ui/TextArea";
import { Input } from "../../ui/Input";
import { Calendar } from "../../ui/Calendar";
import { Button } from "../../ui/Button";
import { FormError } from "../../ui/FormError";
import { useForm } from "react-hook-form";
import { useEditJournal, useGetJournal } from "./useDiaries";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "../../ui/Spinner";
const Form = styled(BaseForm)`
  height: 1000px;
  width: 1100px;
  margin-top: 4%;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 20px;
`;

function EditJournalForm() {
  const { id } = useParams();
  const { edit, isEditing } = useEditJournal();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { journal, isFetchingSingleJournal } = useGetJournal(id);

  const date = new Date(journal?.created);
  const { register, handleSubmit } = useForm();

  function onSubmit(formData) {
    edit(
      { ...formData, id },
      {
        onSuccess: () => {
          navigate("/diaries");
        },
        onError: (err) => {
          if (err.message === 500) {
            setError("Couldn't be added!");
          }
        },
      }
    );
  }
  if (isFetchingSingleJournal || isEditing) {
    return <Spinner />;
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {!(error.length === 0) && <FormError />}
      <h1>Edit Journal</h1>
      <InputContainer>
        <Calendar
          {...register("created")}
          defaultValue={`${date.getFullYear()}-${
            date.getMonth() + 1 < 10
              ? `0${date.getMonth() + 1}`
              : date.getMonth() + 1
          }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`}
        />
        <Input {...register("title")} defaultValue={journal.title} />
      </InputContainer>
      <TextArea {...register("content")} defaultValue={journal.content} />
      <Button disabled={isEditing}>Submit</Button>
    </Form>
  );
}

export default EditJournalForm;
