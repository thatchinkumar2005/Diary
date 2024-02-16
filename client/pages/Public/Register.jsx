import styled from "styled-components";
import RegisterForm from "../../features/auth/RegisterForm";

const StyledSignIn = styled.div`
  min-height: 100vh;
  background-color: #512b81;
  display: grid;
  place-items: center;
`;

function Register() {
  return (
    <StyledSignIn>
      <RegisterForm />
    </StyledSignIn>
  );
}

export default Register;
