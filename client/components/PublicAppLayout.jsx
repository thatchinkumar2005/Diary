import styled from "styled-components";
import PublicNav from "./PublicNav";
import { Outlet } from "react-router-dom";

const StyledPublicAppLayout = styled.div`
  height: 100vh;
`;

function PublicAppLayout() {
  return (
    <StyledPublicAppLayout>
      <PublicNav />
      <Outlet />
    </StyledPublicAppLayout>
  );
}

export default PublicAppLayout;
