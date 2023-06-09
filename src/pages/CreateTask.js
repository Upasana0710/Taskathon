import React, { useState } from 'react'
import { db } from '../utils/init-firebase';
import { uid } from "uid";
import { set, ref } from "firebase/database"
import styled from "styled-components";

const CreateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bgLight};
  overflow-y: hidden;
  overflow-x: hidden;
`;
const Card = styled.div`
  background: ${({ theme }) => theme.card};
  height: fit-content;
  width: 420px;
  padding: 28px 0px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Role = styled.div`
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.card + 99};
  font-weight: 550;
  font-size: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 80%;
  height: 28px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 99};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  padding: 2px 6px;
`;
const ButtonContainer = styled.div`
  width: 84%;
  background: ${({ theme }) => theme.primary + 99};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  height: 30px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
`;
const CreateTask = () => {
    const [task, setTask] = useState({ title: "", desc: "", due: "" });

    const writeToDatabase = () => {
        const uuid = uid();
        set(ref(db, `/${uuid}`), {
            task,
            uuid,
        });

        setTask({ title: "", desc: "", due: "" });
    };
    return (
        <CreateContainer>
            <Card>
                <Role>Create a new Task</Role>
                <Fields>
                    <Field>
                        <input
                            type="text"
                            placeholder="Title"
                            style={{
                                background: "inherit",
                                color: "inherit",
                                outline: "none",
                                border: "none",
                                width: "100%",
                            }}
                            value={task.title}
                            onChange={(e) =>
                                setTask({ ...task, title: e.target.value })
                            }
                        />
                    </Field>
                    <Field style={{height: "100px", alignItems: "flex-start", padding: "12px 6px"}}>
                    <textarea
                      placeholder="Desc"
                      cols= "4"
                      style={{
                        background: "inherit",
                        color: "inherit",
                        outline: "none",
                        border: "none",
                        width: "100%",
                      }}
                      value={task.desc}
                      onChange={(e) =>
                        setTask({ ...task, desc: e.target.value })
                      }
                    />
                  </Field>
                  <Field>
                        <input
                            type="text"
                            placeholder="Due Date"
                            style={{
                                background: "inherit",
                                color: "inherit",
                                outline: "none",
                                border: "none",
                                width: "100%",
                            }}
                            value={task.due}
                            onChange={(e) =>
                                setTask({ ...task, due: e.target.value })
                            }
                        />
                    </Field>
                    <ButtonContainer onClick={() => writeToDatabase()}>
                    Create
                  </ButtonContainer>
                </Fields>

            </Card>
        </CreateContainer>
    )
}

export default CreateTask