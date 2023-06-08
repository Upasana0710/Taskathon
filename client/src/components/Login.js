import React, { useState, useEffect, useRef } from "react";
import { Modal } from "@mui/material";
import styled from "styled-components";
import useMounted from './hooks/useMounted';
import { useNavigate } from "react-router-dom";
import {useToast} from '@chakra-ui/react';
import {useAuth} from '../contexts/AuthContext';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.bgLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Card = styled.div`
  background: ${({ theme }) => theme.card};
  height: fit-content;
  width: 420px;
  padding: 28px 0px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerCard = styled.div`
  background: ${({ theme }) => theme.bgLight};
  height: 90%;
  width: 90%;
  border-radius: 8px;
`;
const ToggleContainer = styled.div`
  border-radius: 8px 8px 0px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  display: flex;
  height: 46px;
  align-items: center;
  cursor: pointer;
`;
const Role = styled.div`
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.card+99};
  flex: 0.5;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Roleh = styled.div`
  color: ${({ theme }) => theme.primary};
  flex: 0.5;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;
const Fields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  width: 100%;
  gap: 14px;
`;
const Field = styled.div`
  width: 90%;
  height: 28px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 99};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  padding: 2px 6px;
`;
const ButtonContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.primary + 99};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
`;
const Message = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
const ForgotPassword = styled.div`
  color: red;
  font-size: 13px;
  cursor: pointer;
  position: absolute;
  right: 0px;
  bottom: 0px;
`;
const PasswordContainer = styled.div`
  gap: 2px;
  width: 94%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
`;

const Login = ({ signUpOpen, setSignUpOpen, forgotPassword, setForgotPassword }) => {
  const mounted = useMounted();
  const navigate = useNavigate();
  const [role, setRole] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [isNew, setIsNew] = useState(true);
  const toast = useToast();
  const { register, login } = useAuth();
  const clear = () => {
    setUser({ username: "", email: "", password: "", role: "" });
  };
  const handleSubmitSignup = () => {
    if (role) {
       setUser({ ...user, role: "Admin" });
      console.log("running");
    } else {
      setUser({ ...user, role: "Employee" });
    }
    
    if (!user.email || !user.password) {
      toast({
        description: 'Credentials not valid.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    register(user.email,user.password).then((res)=>{
    console.log(res);
    navigate('/');
  }).catch((error)=>{
    console.log(error)
    toast({
      description: error.message,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  })
    // await login(user)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // if (user.username === "" || user.email === "" || user.password === "") {
    //   alert("Please fill in the required details");
    // } else {
    //   dispatch(login(user, navigate));
    // }
    mounted.current && clear();
    mounted.current && setSignUpOpen(false);
  }
  const handleSubmitSignin = () => {
    if (role) {
       setUser({ ...user, role: "Admin" });
      console.log("running");
    } else {
      setUser({ ...user, role: "Employee" });
    }
    
    if (!user.email || !user.password) {
      toast({
        description: 'Credentials not valid.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    login(user.email,user.password).then((res)=>{
    console.log(res)
    navigate('/');
  }).catch((error)=>{
    console.log(error)
    toast({
      description: error.message,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  })
    // await login(user)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // if (user.username === "" || user.email === "" || user.password === "") {
    //   alert("Please fill in the required details");
    // } else {
    //   dispatch(login(user, navigate));
    // }
    mounted.current && clear();
    mounted.current && setSignUpOpen(false);
  }
  
  return (
    <>
      {signUpOpen && (
          <Container>
            <Card>
              <InnerCard>
                <ToggleContainer>
                  {role ? (
                    <Roleh
                      style={{ borderRight: "1px solid #8370FE" }}
                      onClick={() => setRole(true)}
                    >
                      Admin
                    </Roleh>
                  ) : (
                    <Role
                      style={{ borderRight: "1px solid #8370FE" }}
                      onClick={() => setRole(true)}
                    >
                      Admin
                    </Role>
                  )}
                  {role ? (
                    <Role onClick={() => setRole(false)}>Employee</Role>
                  ) : (
                    <Roleh onClick={() => setRole(false)}>Employee</Roleh>
                  )}
                </ToggleContainer>
                {role ? (
                  isNew ? (
                    <Fields>
                      <Field>
                        <input
                          type="text"
                          placeholder="Email"
                          style={{
                            background: "inherit",
                            color: "inherit",
                            outline: "none",
                            border: "none",
                            width: "100%",
                          }}
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                      </Field>
                      <Field>
                        <input
                          type="password"
                          placeholder="Password"
                          style={{
                            background: "inherit",
                            color: "inherit",
                            outline: "none",
                            border: "none",
                            width: "100%",
                          }}
                          value={user.password}
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                        />
                      </Field>
                      <ButtonContainer onClick={() => handleSubmitSignup()} style={{width: "94%"}}>
                        Sign Up
                      </ButtonContainer>
                      <Message onClick={() => setIsNew(!isNew)}>
                        Already have an account? Sign In
                      </Message>
                    </Fields>
                  ) : (
                    <Fields>
                      <Field>
                        <input
                          type="text"
                          placeholder="Email"
                          style={{
                            background: "inherit",
                            color: "inherit",
                            outline: "none",
                            border: "none",
                            width: "100%",
                          }}
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                      </Field>
                      <Field>
                        <input
                          type="password"
                          placeholder="Password"
                          style={{
                            background: "inherit",
                            color: "inherit",
                            outline: "none",
                            border: "none",
                            width: "100%",
                          }}
                          value={user.password}
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                        />
                      </Field>
                      <PasswordContainer>
                      <ButtonContainer onClick={() => handleSubmitSignin()}>
                        Sign In
                      </ButtonContainer>
                      <ForgotPassword onClick={()=>setForgotPassword(true)}>Forgot Password</ForgotPassword>
                      </PasswordContainer>
                      <Message onClick={() => setIsNew(!isNew)}>
                        Do not have an account? Sign Up
                      </Message>
                    </Fields>
                  )
                ) : (
                  <Fields>
                    <Field>
                      <input
                        type="text"
                        placeholder="Email"
                        style={{
                          background: "inherit",
                          color: "inherit",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </Field>
                    <Field>
                      <input
                        type="password"
                        placeholder="Password"
                        style={{
                          background: "inherit",
                          color: "inherit",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        value={user.password}
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
                      />
                    </Field>
                    <ButtonContainer onClick={() => handleSubmitSignin()}>
                      Sign In
                    </ButtonContainer>
                  </Fields>
                )}
              </InnerCard>
            </Card>
          </Container>
      )}
      {forgotPassword && <ForgotPassword forgotPassword={forgotPassword} setForgotPassword={setForgotPassword}/>}
    </>
  );
};

export default Login;
