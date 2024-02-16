import styled from "styled-components";
import CreateJournalForm from "../../features/diaries/CreateJournalForm";

const StyledCreateJournal = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  background-color: #dcf2f1;
  place-items: center;
`;

function CreateJournal() {
  return (
    <StyledCreateJournal>
      <CreateJournalForm />
    </StyledCreateJournal>
  );
}

export default CreateJournal;
