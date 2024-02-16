import styled from "styled-components";
import LoginForm from "../../features/auth/LoginForm";

const StyledLogin = styled.div`
  min-height: 100vh;
  background-color: #512b81;
  display: grid;
  place-items: center;
`;

function Login() {
  return (
    <StyledLogin>
      <LoginForm />
    </StyledLogin>
  );
}

export default Login;
