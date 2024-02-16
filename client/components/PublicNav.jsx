import styled from "styled-components";
import { BsBook } from "react-icons/bs";
import { NavLink as BaseNavLink, useNavigate } from "react-router-dom";

const StyledPublicNav = styled.nav`
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
  gap: 10px;
  margin-right: 5%;
`;

const NavLink = styled(BaseNavLink)`
  font-size: 20px;
  transition: all 250ms;
  color: #faeed1;

  &:hover {
    transform: translateY(-2.5px);
    color: #5fbdff;
  }
`;

const Logo = styled.div`
  margin-left: 5%;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
function PublicNav() {
  const navigate = useNavigate();
  return (
    <StyledPublicNav>
      <Logo
        onClick={() => {
          navigate("/");
        }}
      >
        <BsBook size={60} color="#FAEED1" />
        <h1 style={{ color: "#FAEED1" }}>DIARY</h1>
      </Logo>
      <StyledUl>
        <NavLink to="/diaries">Journals</NavLink>
        <NavLink to="/auth/login">Login</NavLink>
        <NavLink to="/auth/register">Signup</NavLink>
      </StyledUl>
    </StyledPublicNav>
  );
}

export default PublicNav;
