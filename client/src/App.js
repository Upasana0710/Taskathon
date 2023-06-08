import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { darkTheme, lightTheme } from "./utils/Theme";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";

const Trackminster = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bgLight};
  overflow-y: hidden;
  overflow-x: hidden;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [signUpOpen, setSignUpOpen] = useState(false);
  useEffect(() => {
    console.log(signUpOpen);
  });
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Trackminster>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Navbar setSignUpOpen={setSignUpOpen} />
          <Login signUpOpen={signUpOpen} setSignUpOpen={setSignUpOpen} />
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
          </Routes>
        </Trackminster>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

