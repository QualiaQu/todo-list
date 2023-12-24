import {useState} from 'react';
import styled from 'styled-components'
import SaveTask from "./SaveTask";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

const AddTaskButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const AddTask = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const addTaskButtonClick = () => {
        setIsModalVisible(true)
    }

    const closeAlert = () => {
        setIsModalVisible(false);
    }

    const renderModal = () => {
        if (!isModalVisible) {
            return null;
        }

        return (
            <SaveTask close={closeAlert}/>
        );
    }

    return (
        <>
            {renderModal()}
            <Container>
                <AddTaskButton onClick={addTaskButtonClick}>Добавить задачу</AddTaskButton>
            </Container>
        </>
    )
}