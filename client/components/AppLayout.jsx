import styled from "styled-components";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <AppNav />
      <main>
        <Outlet />
      </main>
    </StyledAppLayout>
  );
}

export default AppLayout;
