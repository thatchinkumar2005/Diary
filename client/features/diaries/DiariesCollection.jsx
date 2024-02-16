import styled from "styled-components";
import useDiaries, { useDeleteJournal } from "./useDiaries";
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const StyledDiariesCollection = styled.div`
  background-color: #0f1035;
  height: 1000px;
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  place-self: center;
  overflow: scroll;
  row-gap: 10px;
  column-gap: 10px;
  padding: 2%;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const StyledJournalCard = styled.div`
  background-color: #dcf2f1;
  display: flex;
  flex-direction: column;
  padding: 2%;
  border-radius: 20px;
  transition: all 250ms;
  border: grey solid 5px;
  opacity: 90%;

  &:hover {
    opacity: 100%;
    background-color: #c7eae9;
    transform: scale(1.02);
  }
`;

const JournalCardFooter = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 10px;
  margin-top: auto;
  transition: all 250ms;
`;

const JournalCardFooterElement = styled.div`
  transition: all 250ms;
  &:hover {
    transform: scale(1.15);
    opacity: 100%;
  }
`;

function Journal({ title, content, created, onClick, OnEdit, OnDelete }) {
  const date = new Date(created);
  const content_ =
    content.length > 20
      ? content.split(" ").slice(0, 25).join(" ") + "..."
      : content;

  const title_ =
    title.length > 20 ? title.split(" ").slice(0, 4).join(" ") + "..." : title;

  return (
    <StyledJournalCard>
      <div onClick={onClick} style={{ marginBottom: "auto" }}>
        <h1 style={{ marginBottom: "1%", alignSelf: "center" }}>{title}</h1>
        <h2 style={{ color: "#365486", alignSelf: "center" }}>
          created :{" "}
          {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
        </h2>
        <p style={{ padding: "1%" }}>{content_}</p>
      </div>

      <JournalCardFooter>
        <JournalCardFooterElement onClick={OnEdit}>
          <BsPencilSquare size={20} />
        </JournalCardFooterElement>
        <JournalCardFooterElement onClick={OnDelete}>
          <BsTrash size={20} />
        </JournalCardFooterElement>
      </JournalCardFooter>
    </StyledJournalCard>
  );
}

function DiariesCollection() {
  const navigate = useNavigate();
  const { journals, isLoading } = useDiaries();
  const { Delete } = useDeleteJournal();

  journals?.sort((a, b) => {
    return b.id - a.id;
  });

  function handleClick(id) {
    navigate(`/diaries/${id}`);
  }
  function handleEdit(id) {
    navigate(`/diaries/edit/${id}`);
  }
  function handleDelete(id) {
    Delete(id);
  }

  if (isLoading) return <h1>Loading</h1>;
  if (journals.length === 0) return <h1>No Journals</h1>;
  return (
    <StyledDiariesCollection>
      {journals.map((journal) => {
        return (
          <Journal
            key={journal.id}
            id={journal.id}
            title={journal.title}
            content={journal.content}
            created={journal.created}
            onClick={() => {
              handleClick(journal.id);
            }}
            OnEdit={() => {
              handleEdit(journal.id);
            }}
            OnDelete={() => {
              handleDelete(Number(journal.id));
            }}
          />
        );
      })}
    </StyledDiariesCollection>
  );
}

export default DiariesCollection;
