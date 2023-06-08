import React, { useState } from 'react'
import { Modal } from "@mui/material";
import styled from "styled-components";
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
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
const Role = styled.div`
  color: ${({ theme }) => theme.text_primary};
  flex: 0.5;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 520;
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
  width: 94%;
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
const ForgotPassword = ({ forgotPassword, setForgotPassword }) => {
    const [email,setEmail] = useState("");
    const {forgotpassword} = useAuth();
    const handleReset = async () => {
        await forgotpassword(email).then((res)=>{
            console.log(res)
        }).catch((err)=>{console.log(err)})
    }
    return (
        <>
            {forgotPassword && (
                    <Container>
                        <Card>
                            <InnerCard>
                                <Role>Forgot Password</Role>
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
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value )
                                            }
                                        />
                                    </Field>
                                    <ButtonContainer onClick={() => handleReset()}>
                                        Reset Password
                                    </ButtonContainer>
                                </Fields>
                            </InnerCard>
                        </Card>
                    </Container>
            )}
        </>
    )
}

export default ForgotPassword