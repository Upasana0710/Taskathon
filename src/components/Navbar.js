import React from "react";
import styled from "styled-components";
import { useAuth } from '../contexts/AuthContext'
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const Navcontainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 16px 40px;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 768px) {
    padding: 16px;
  }
`;
const Button = styled.div`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  padding: 10px 22px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.bg};
  }
  @media (max-width: 768px) {
    padding: 16px;
  }
`;
const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.text_secondary} !important;

`;
const Content = styled.div``;
const Navbar = ({ menuOpen, setMenuOpen, setSignUpOpen }) => {
  const { currentUser, logout } = useAuth()
  const handleLogout = () => {
    logout();
  }
  return (
    <Navcontainer>
      <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
        <MenuIcon />
      </IcoButton>
        {currentUser ? 
          <Button onClick={()=>handleLogout()}>
            <Content>Logout</Content>
          </Button>
          :
          <Button onClick={() => setSignUpOpen(true)}>
            <Content>Login</Content>
          </Button>
        }
      
    </Navcontainer>
  );
};

export default Navbar;
