import styled from "styled-components";
import UserInfo from "../../features/users/UserInfo";

const StyledUserPage = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background-color: #dcf2f1;
`;

function User() {
  return (
    <StyledUserPage>
      <UserInfo />
    </StyledUserPage>
  );
}

export default User;
