import styled from "styled-components";
import { Button } from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  background-color: #512b81;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

function RegisterVerify() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1 style={{ marginBottom: "" }}>Verify Email and Then Login</h1>
      <Button
        onClick={() => {
          navigate("/auth/login");
        }}
      >
        Login
      </Button>
    </Container>
  );
}

export default RegisterVerify;
