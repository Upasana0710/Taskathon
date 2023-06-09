import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { ref, onValue, remove, update } from "firebase/database";
import styled from "styled-components";
import { db } from "../utils/init-firebase";
import { uid } from "uid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DashboardContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex: wrap;
`;
const Get = styled.div`
  width: 100%;
  padding: 20px;
  flex: wrap;
  gap: 12px;
  display: flex;
  justify-content: flex-start;
`;
const Update = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Card = styled.div`
  background: ${({ theme }) => theme.bg};
  min-height: 200px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
`;
const CardTop = styled.div`
  background: ${({ theme }) => theme.bg};
  width: 100%;
  height: 4px;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
`;
const Cardup = styled.div`
  background: ${({ theme }) => theme.bg};
  height: fit-content;
  width: 400px;
  padding: 28px 0px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;
const Title = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
font-weight: 520;
font-size: 18px;
`;
const Icons = styled.div`
padding-top: 20px;
display: flex;
gap: 16px;
position: absolute;
right: 14px;
bottom: 20px;
`;
const Description = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  margin-top: 30px;
  text-align: start;
  width: 100%;
  max-height: 60px; /* Adjust the maximum height as needed */
  overflow: hidden;
  overflow-wrap: break-word;
  line-height: 1.7;
`;
const Due = styled.div`
color: ${({ theme }) => theme.text_secondary};
font-size: 13px;
font-weight: 420;
margin-top: 8px;
`;
const Role = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 550;
  font-size: 20px;
  width: 100%;
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
  height: 28px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
`;
const Dashboard = () => {
  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC"
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1"
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1"
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1"
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD"
    }
  ]
  const [uuid, setUuid] = useState("");
  const [task, setTask] = useState({ title: "", desc: "", due: "" });
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleDelete = (toDelete) => {
    remove(ref(db, `/${toDelete.uuid}`));
  }
  const changeMode = (toUpdate) => {
    setEdit(true);
    setUuid(toUpdate.uuid)
    setTask(toUpdate.task)
  }
  const handleSubmitChange = (e) => {
    e.preventDefault();
    update(ref(db, `/${uuid}`), {
      task,
      uuid: uuid,
    });
    setEdit(false);
  };
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTasks([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((task) => {
          setTasks((oldArray) => [...oldArray, task]);
        });
      }
    });
  }, []);

  return (
    <DashboardContainer>
      {!edit ? (
        <Get>
          {tasks.map((task, index) => (
            <Card>
              <CardTop style={{ backgroundColor: colors[index % 5].primaryColor }} />
              <Content>
                <Title style={{ color: colors[index % 5].primaryColor }}>{task.task?.title}</Title>
                <Description>{task.task?.desc}</Description>
                <Due>Due: {task.task?.due}</Due>
                <Icons>
                  <EditIcon style={{ fontSize: "18px", cursor: "pointer", color : colors[index%5].primaryColor}} onClick={() => changeMode(task)} />
                  <DeleteIcon style={{ fontSize: "18px", cursor: "pointer", color : colors[index%5].primaryColor}} onClick={() => handleDelete(task)} />
                </Icons>
              </Content>
            </Card>
          ))}
        </Get>
      ) : (
        <Update>
          <Cardup>
            <Role>Update Task</Role>
            <Fields>
              <Field>
                <input
                  type="text"
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
              <Field>
                <input
                  type="text"
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
              <ButtonContainer onClick={(e) => handleSubmitChange(e)}>
                Update
              </ButtonContainer>
            </Fields>
          </Cardup>
        </Update>
      )
      }
    </DashboardContainer>
  )
}

export default Dashboard