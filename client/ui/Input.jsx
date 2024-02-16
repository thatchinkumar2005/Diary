import styled from "styled-components";

export const Input = styled.input`
  width: 400px;
  height: 50px;
  background: transparent;
  border: 4px solid black;
  padding: 1.5%;
  font-size: 18px;
  border-radius: 20px;
  text-align: center;
  transition: all 250ms;

  &::placeholder {
    letter-spacing: 10px;
  }
  &:focus {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
