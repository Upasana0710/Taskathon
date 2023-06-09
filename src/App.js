import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { darkTheme, lightTheme } from "./utils/Theme";
import "./App.css";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import CreateTask from "./pages/CreateTask";
import { useAuth } from "./contexts/AuthContext";

const Taskathon = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bgLight};
  overflow-y: hidden;
  overflow-x: hidden;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [signUpOpen, setSignUpOpen] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log("The user is", currentUser);
  }, [currentUser]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Taskathon>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
            <Container>
              <Navbar setSignUpOpen={setSignUpOpen} />
              <Routes>
                <Route path="/" exact element={<Dashboard />} />
                <Route path="/createtask" exact element={<CreateTask />} />
              </Routes>
            </Container>
          </Taskathon>
        ) : (
          <Taskathon>
            <Container>
              <Routes>
                <Route
                  path="/"
                  exact
                  element={
                    <Login
                      signUpOpen={signUpOpen}
                      setSignUpOpen={setSignUpOpen}
                    />
                  }
                />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route
                  path="/resetpassword"
                  exact
                  element={<ResetPassword />}
                />
              </Routes>
            </Container>
          </Taskathon>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

function ProtectedRoute(props) {
  const { currentUser } = useAuth();
  const { path } = props;
  console.log("path", path);
  const location = useLocation();
  console.log("location state", location.state);

  // if (
  //   path === '/login' ||
  //   path === '/register' ||
  //   path === '/forgot-password' ||
  //   path === '/reset-password'
  // ) {
  //   return currentUser ? (
  //     <redirect to={location.state?.from ?? '/profile'} />
  //   ) : (
  //     <Route {...props} />
  //   )
  // }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <redirect
      to={{
        pathname: "/login",
        state: { from: path },
      }}
    />
  );
}