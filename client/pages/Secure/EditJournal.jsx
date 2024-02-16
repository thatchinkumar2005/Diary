import styled from "styled-components";
import EditJournalForm from "../../features/diaries/EditJournalForm";

const StyledEditJournal = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  background-color: #dcf2f1;
  place-items: center;
`;

function EditJournal() {
  return (
    <StyledEditJournal>
      <EditJournalForm />
    </StyledEditJournal>
  );
}

export default EditJournal;
