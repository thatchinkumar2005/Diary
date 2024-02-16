import styled from "styled-components";

const StyledPublicHome = styled.div`
  height: 800px;

  background-color: #512b81;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;
const Head = styled.h1`
  margin-top: 3%;
  font-size: 100px;
`;

function PublicHome() {
  return (
    <StyledPublicHome>
      <Head style={{ gridColumn: "5/6" }}>DIARY</Head>
    </StyledPublicHome>
  );
}

export default PublicHome;
