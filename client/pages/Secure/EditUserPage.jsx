import styled from "styled-components";
import EditUserForm from "../../features/users/EditUser";

const StyledEditUserPage = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

function EditUserPage() {
  return (
    <StyledEditUserPage>
      <EditUserForm />
    </StyledEditUserPage>
  );
}

export default EditUserPage;
