import styled from "styled-components";

export const Button = styled.button`
  height: 60px;
  width: 100px;
  min-height: 40px;
  max-height: 50px;
  min-width: 150px;
  max-width: 300px;

  border-radius: 30px;
  border: solid 4px black;
  background: transparent;

  font-size: 18px;
  transition: all 250ms;

  &:hover {
    background-color: #8cb9bd;
    color: white;
  }
`;
