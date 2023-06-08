import React from "react";
import styled from "styled-components";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

const MenuContainer = styled.div`
  width: 200px;
  flex-direction: column;
  height: 100vh;
  display: flex;
  padding: 80px 0px;
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
  color: ${({ theme }) => theme.text_secondary};
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.text_secondary + 50};
  }
`;
const NavText = styled.div`
  padding: 12px 0px;
`;
// eslint-disable-next-line react/prop-types
const Menu = ({ darkMode, setDarkMode }) => {
  return (
    <MenuContainer>
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
