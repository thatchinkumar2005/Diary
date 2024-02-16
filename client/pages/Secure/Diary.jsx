import styled from "styled-components";
import Diary_ from "../../features/diaries/Diary";

const StyledDiaryPage = styled.div`
  min-height: 100vh;
  background-color: #dcf2f1;
  display: grid;
  place-items: center;
`;

function Diary() {
  return (
    <StyledDiaryPage>
      <Diary_ />
    </StyledDiaryPage>
  );
}

export default Diary;
