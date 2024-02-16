import styled from "styled-components";
import useGetAllJournals from "../diaries/useDiaries";
import useGetUserInfo from "./useUsers";
import { BsPencilSquare } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link as BaseLink, useNavigate } from "react-router-dom";

const StyledUserInfoCard = styled.div`
  min-width: 700px;
  background-color: #0f1035;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-auto-rows: minmax(50px, 50px);
  padding: 3%;
  column-gap: 10px;
  row-gap: 40px;
`;

const Userfield = styled.div`
  background: transparent;
  border-radius: 20px;
  display: grid;
  place-items: center;
  color: white;
  font-size: 24px;
`;

const UserfieldValue = styled.div`
  background-color: transparent;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  font-size: 24px;
  gap: 20px;
`;

const Icon = styled.div`
  display: grid;
  align-items: center;
  transition: all 250ms;

  &:hover {
    transform: scale(1.1);
    color: #7fc7d9;
  }
`;

const Link = styled(BaseLink)`
  transition: all 250ms;
  font-size: 18px;

  &:hover {
    transform: scale(1.05);
    color: #7fc7d9;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Operations = styled.div`
  align-self: flex-start;
  margin-left: 20px;
  display: flex;
  gap: 10px;
`;

function UserInfo() {
  const { userInfo, isLoading } = useGetUserInfo();
  const { journals, isLoading: isFetchingJournals } = useGetAllJournals();
  const navigate = useNavigate();

  function handleNameChange() {
    navigate("/user/edit/name");
  }

  function handleEmailChange() {
    navigate("/user/edit/email");
  }

  if (isLoading || isFetchingJournals) return <h1>Loading</h1>;
  return (
    <UserInfoContainer>
      <CgProfile size={150} />

      <StyledUserInfoCard>
        <Userfield>Name : </Userfield>

        <UserfieldValue>
          {`${userInfo.fname} ${userInfo.lname}`}{" "}
          <Icon onClick={handleNameChange}>
            <BsPencilSquare />
          </Icon>
        </UserfieldValue>

        <Userfield>Username : </Userfield>

        <UserfieldValue>{`${userInfo.username}`}</UserfieldValue>

        <Userfield>Email : </Userfield>

        <UserfieldValue>
          {`${userInfo.email}`}
          <Icon onClick={handleEmailChange}>
            <BsPencilSquare />
          </Icon>
        </UserfieldValue>

        <Userfield>Total Journals : </Userfield>

        <UserfieldValue>{`${journals.length}`}</UserfieldValue>
      </StyledUserInfoCard>
      <Operations>
        <Link to="/auth/logout">Logout</Link>
        <Link to="/user/edit/pswd">Change Password</Link>
      </Operations>
    </UserInfoContainer>
  );
}

export default UserInfo;
