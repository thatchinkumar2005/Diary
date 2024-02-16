import styled from "styled-components";
import { BsBook } from "react-icons/bs";
import { NavLink as BaseNavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const StyledAppNav = styled.nav`
  height: 10%;
  max-height: 200px;
  min-height: 100px;
  background-color: #35155d;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledUl = styled.ul`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-right: 5%;
`;

const NavLink = styled(BaseNavLink)`
  font-size: 24px;
  transition: all 250ms;
  color: #faeed1;

  &:hover {
    transform: translateY(-3px);
    color: #5fbdff;
  }
  &.active {
    color: #f3b95f;
  }
`;

const Logo = styled.div`
  margin-left: 5%;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;
function AppNav() {
  return (
    <StyledAppNav>
      <Logo>
        <BsBook size={60} color="white" />
        <h1 style={{ color: "white" }}>DIARY</h1>
      </Logo>
      <StyledUl>
        <NavLink to="/diaries">diaries</NavLink>

        <NavLink to="/user">
          <CgProfile size={30} />
        </NavLink>
      </StyledUl>
    </StyledAppNav>
  );
}

export default AppNav;
