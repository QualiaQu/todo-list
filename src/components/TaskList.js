import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import EditTask from './EditTask';
import DeleteTask from "./DeleteTask";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  width: 400px;
`;

const TaskText = styled.span`
  flex-grow: 1; /* Растягиваем текст задачи на всю доступную ширину */
  margin-right: 8px; /* Добавляем небольшой отступ справа для разделения от чекбокса */
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const Checkbox = styled.input`
  margin-right: 4px;
`;

const EditButton = styled.button`
  background-color: #4caf50; 
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const DeleteButton = styled.button`
  background-color: #ff5252;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const fetchTasks = async () => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
};

const updateTaskStatus = async ({ taskId, completed }) => {
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = existingTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return updatedTasks;
};

export const TaskList = () => {
    const queryClient = useQueryClient();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null); // Добавляем состояние для taskId

    const editTaskButtonClick = (taskId) => {
        setIsEditModalVisible(true)
        setCurrentTaskId(taskId);
    };
    const deleteTaskButtonClick = (taskId) => {
        setIsDeleteModalVisible(true);
        setCurrentTaskId(taskId);
    };

    const closeEditAlert = () => {
        setIsEditModalVisible(false);
    }
    const closeDeleteAlert = () => {
        setIsDeleteModalVisible(false);
    }

    const renderEditModal = () => {
        if (!isEditModalVisible) {
            return null;
        }
        return (
            <EditTask close={closeEditAlert} taskId={currentTaskId}/>
        );
    }
    const renderDeleteModal = () => {
        if (!isDeleteModalVisible) {
            return null;
        }
        return (
            <DeleteTask close={closeDeleteAlert} taskId={currentTaskId}/>
        );
    }

    const { data: tasks, isLoading, isError } = useQuery('tasks', fetchTasks);

    const mutationUpdate = useMutation(updateTaskStatus, {
        onSuccess: (data) => {
            queryClient.setQueryData('tasks', data);
        },
    });

    const handleCheckboxChange = (taskId, completed) => {
        mutationUpdate.mutate({ taskId, completed: !completed });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading tasks</p>;
    }

    return (
        <>
            {renderEditModal()}
            {renderDeleteModal()}
            <Container>
                <h2>Список задач</h2>
                <ul>
                    {tasks.map((task) => (
                        <TaskItem key={task.id}>
                            <TaskText completed={task.completed}>{task.text}</TaskText>
                            <Checkbox
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleCheckboxChange(task.id, task.completed)}
                            />
                            <EditButton onClick={() => editTaskButtonClick(task.id)}>Редактировать</EditButton>
                            <DeleteButton onClick={() => deleteTaskButtonClick(task.id)}>Удалить</DeleteButton>
                        </TaskItem>
                    ))}
                </ul>
            </Container>
        </>
    );
};
