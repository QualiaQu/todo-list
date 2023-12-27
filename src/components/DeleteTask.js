import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';

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

const Content = styled.div`
  padding: 20px 30px;
  background: white;
  border-radius: 10px;
  position: relative;
`;


const DeleteButton = styled.button`
  background-color: #ff5252;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 20px auto 10px; /* Центрируем кнопку Удалить и увеличиваем отступ снизу */
`;

const EditTask = (props) => {
    const queryClient = useQueryClient();
    const contentComponentClickHandle = (event) => {
        event.stopPropagation();
    };


    const mutationDelete = useMutation(async (taskId) => {
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = existingTasks.filter((task) => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
    }, {
        onSuccess: (data) => {
            queryClient.setQueryData('tasks', data);
            props.close();
        },
    });

    const handleDeleteClick = () => {
        mutationDelete.mutate(props.taskId);
    };

    return (
        <Backdrop onClick={props.close}>
            <Content onClick={contentComponentClickHandle}>
                <p style={{ textAlign: 'center' }}>Вы уверены что хотите удалить задачу?</p>
                <DeleteButton onClick={() => handleDeleteClick()}>Удалить</DeleteButton>
            </Content>
        </Backdrop>
    );
};

export default EditTask;
