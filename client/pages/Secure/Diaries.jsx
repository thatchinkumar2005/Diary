import styled from "styled-components";
import DiariesCollection from "../../features/diaries/DiariesCollection";
import { BsPlusCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const StyledDiaries = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  background-color: #dcf2f1;
  place-items: center;
`;
const AddIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3%;
  transition: all 250ms;
  &:hover {
    transform: scale(1.3);
  }
`;

function Diaries() {
  const navigate = useNavigate();
  function handleAdd() {
    navigate("/diaries/create");
  }
  return (
    <StyledDiaries>
      <h1 style={{ marginTop: "2%", marginBottom: "2%" }}>All Your Journals</h1>
      <DiariesCollection />
      <AddIcon>
        <BsPlusCircleFill size={50} fill="#0F1035" onClick={handleAdd} />
      </AddIcon>
    </StyledDiaries>
  );
}

export default Diaries;
