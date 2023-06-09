import React from "react";
import styled from "styled-components";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Link } from 'react-router-dom';

const MenuContainer = styled.div`
  width: 200px;
  flex-direction: column;
  height: 100vh;
  display: flex;
  padding: 24px 0px;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 250px;
    left: ${({ setMenuOpen }) => (setMenuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
`;
const Elements = styled.div`
  padding: 4px 16px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  width: 100%;
  color: ${({ theme }) => theme.text_secondary};
  &:hover {
    background-color: ${({ theme }) => theme.text_secondary + 50};
  }
`;
const NavText = styled.div`
  padding: 12px 0px;
`;
const Name = styled.div`
color: ${({ theme }) => theme.primary};
font-size: 20px;
text-align: center;
width: 100%;
margin-bottom: 18px;
`;
const Close = styled.div`
display: none;
@media (max-width: 1100px) {
  display: block;

}
`;

// eslint-disable-next-line react/prop-types
const Menu = ({ darkMode, setDarkMode, setMenuOpen }) => {
  return (
    <MenuContainer>
      <Name>
        TASKATHON
      </Name>
      <Close>
        <MenuOutlinedIcon onClick={() => setMenuOpen(false)} style={{ cursor: "pointer" }} />
      </Close>
      <Link to="/createtask" style={{ textDecoration: "none", width: "100%" }}>
        <Elements>
          <AddCircleOutlineIcon />
          <NavText>Create Task</NavText>
        </Elements>
      </Link>
      {darkMode ? (
        <Elements onClick={() => setDarkMode(false)}>
          <LightModeRoundedIcon />
          <NavText>Light Mode</NavText>
        </Elements>
      ) : (
        <Elements onClick={() => setDarkMode(true)}>
          <DarkModeRoundedIcon />
          <NavText>Dark Mode</NavText>
        </Elements>
      )}
    </MenuContainer>
  );
};

export default Menu;
