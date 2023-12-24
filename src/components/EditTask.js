import React, { useState, useEffect } from 'react';
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

const SaveButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px;
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
    const [editedText, setEditedText] = useState('');
    const contentComponentClickHandle = (event) => {
        event.stopPropagation();
    };

    // Загружаем текст выбранной задачи в инпут при монтировании компонента
    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const selectedTask = tasks.find((task) => task.id === props.taskId);
        if (selectedTask) {
            setEditedText(selectedTask.text);
        }
    }, [props.taskId]);

    const handleInputChange = (event) => {
        setEditedText(event.target.value);
    };

    const mutationUpdateText = useMutation(async ({ taskId, newText }) => {
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = existingTasks.map((task) =>
            task.id === taskId ? { ...task, text: newText } : task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
    }, {
        onSuccess: (data) => {
            queryClient.setQueryData('tasks', data);
        },
    });

    const handleSaveClick = () => {
        mutationUpdateText.mutate({ taskId: props.taskId, newText: editedText });
        props.close();
    };

    return (
        <Backdrop onClick={props.close}>
            <Content onClick={contentComponentClickHandle}>
                <p style={{ textAlign: 'center' }}>Редактирование задачи</p>
                <input
                    type="text"
                    value={editedText}
                    onChange={handleInputChange}
                    placeholder="Введите новый текст задачи"
                />
                <SaveButton onClick={handleSaveClick}>Сохранить изменения</SaveButton>

            </Content>
        </Backdrop>
    );
};

export default EditTask;
