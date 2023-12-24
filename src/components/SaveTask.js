import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background: #0000007d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const SaveButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px;
  padding: 5px 10px;
`;

const Content = styled.div`
  padding: 20px 30px;
  background: white;
  border-radius: 10px;
  position: relative;
`;

const SaveTask = (props) => {
    const queryClient = useQueryClient();
    const [taskText, setTaskText] = useState('');

    const contentComponentClickHandle = (event) => {
        event.stopPropagation();
    };

    const handleTaskTextChange = (event) => {
        setTaskText(event.target.value);
    };

    const handleSaveTask = () => {
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = {
            id: existingTasks.length, // Incremental ID
            text: taskText,
            completed: false,
        };
        const updatedTasks = [...existingTasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTaskText('');
        props.close();
        queryClient.invalidateQueries('tasks');
    };

    return (
        <Backdrop onClick={props.close}>
            <Content onClick={contentComponentClickHandle}>
                <input type="text" value={taskText} onChange={handleTaskTextChange} placeholder="Введите текст задачи" />
                <SaveButton onClick={handleSaveTask}>Сохранить задачу</SaveButton>
            </Content>
        </Backdrop>
    )
};

export default SaveTask;
