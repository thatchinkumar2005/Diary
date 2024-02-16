import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import verifyApi from "../../services/verifyApi";
import useAxios from "../../hooks/useAxios";
import { Button } from "../../ui/Button";
import styled from "styled-components";
import { Spinner } from "../../ui/Spinner";

const Container = styled.div`
  min-height: 100vh;
  background-color: #512b81;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Verify() {
  const axios = useAxios();
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mailToken } = useParams();
  const verify = verifyApi(axios);

  async function verify_() {
    setIsLoading(true);
    try {
      const data = await verify(mailToken);
      if (data.verified === true) {
        setVerified(true);
      }
    } catch (error) {
      if (error.message == 401) {
        setError("url Expired");
      } else {
        setError("Invalid url To verify");
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    verify_();
  }, []);
  console.log(mailToken);

  if (isLoading) return <Spinner />;
  return (
    <Container>
      {verified ? (
        <div>
          <h1>Successfully Verified</h1>
          <Button
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Login
          </Button>
        </div>
      ) : (
        <div style={{ marginBottom: "10%" }}>
          <h1>Verification Failed :</h1>
          <h2>{error}</h2>
          <Button
            onClick={() => {
              navigate("/auth/login");
            }}
            style={{ marginTop: "20%" }}
          >
            Login
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Verify;
