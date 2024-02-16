import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetJournal } from "./useDiaries";
import { Spinner } from "../../ui/Spinner";

const StyledDiary = styled.div`
  min-height: 600px;
  max-height: 800px;
  width: 900px;
  background-color: #0f1035;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3%;
  color: white;
`;

const Title = styled.h1`
  margin-bottom: 3%;
`;
const Content = styled.p`
  white-space: pre-wrap;
  font-size: 24px;
`;
const Date_ = styled.h2`
  align-self: flex-start;
  margin-bottom: 3%;
  color: #dcf2f1;
`;

function Diary() {
  const { id } = useParams();
  const { journal, isFetchingSingleJournal } = useGetJournal(id);
  const date = new Date(journal?.created);
  if (isFetchingSingleJournal) return <Spinner />;
  return (
    <StyledDiary>
      <Title>{journal.title}</Title>
      <Date_>{`${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`}</Date_>
      <Content>{journal.content}</Content>
    </StyledDiary>
  );
}

export default Diary;
