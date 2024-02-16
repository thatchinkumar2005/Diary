import styled from "styled-components";

export const Calendar = styled.input.attrs(() => ({
  type: "date",
}))`
  background: transparent;
  width: 140px;
  height: 50px;
  border: black 2px solid;
  border-radius: 20px;
  padding: 2%;
`;
