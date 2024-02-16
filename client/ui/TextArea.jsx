import styled from "styled-components";

export const TextArea = styled.textarea`
  width: 800px;
  height: 600px;
  background: transparent;
  border: 4px solid black;
  padding: 1.5%;
  font-size: 18px;
  border-radius: 20px;
  transition: all 250ms;
  overflow: scroll;

  &:focus {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
