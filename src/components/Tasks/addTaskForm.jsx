import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../axios';
import { onAddTask } from '../../redux/todoSlice';
import addSvg from '../../assets/img/add.svg';
import Button from '../Button';
import Input from '../Input';
import styled from 'styled-components';

const TaskForm = styled.div`
    margin-top: 20px;
`;

const TaskFormBlock = styled.div`
    margin-top: 15px;
`;

const InputStyled = styled(Input)`
    margin-bottom: 15px;
`;

const ButtonGrey = styled(Button)`
    margin-left: 10px;
`;

const TaskFormNew = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0.4;
    &:hover {
        opacity: 0.8;
        transition: opacity 0.15s ease-in-out;
    }
    span {
        margin-left: 17px;
        font-size: 16px;
    }
    img {
        width: 16px;
        height: 16px;
        margin-left: 1.5px;
    }
`;

const TaskFormNewImg = styled.img`
      width: 16px;
      height: 16px;
      margin-left: 1.5px;
`;

const TaskFormNewText = styled.div`
    margin-left: 17px;
    font-size: 16px;
`;

const AddTaskForm = ({ list }) => {
    const [visibleForm, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const dispatch = useDispatch();

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue('');
    };

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false,
        };
        axios
            .post('/tasks', obj)
            .then(({ data }) => {
                dispatch(onAddTask({ data, list }));
                toggleFormVisible();
            })
            .catch((error) => {
                alert('Ошибка при добавлении задачи');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <TaskForm>
            {!visibleForm ? (
                <TaskFormNew onClick={toggleFormVisible}>
                    <TaskFormNewImg src={addSvg} alt="Добавить иконку" />
                    <TaskFormNewText>Новая задача</TaskFormNewText>
                </TaskFormNew>
            ) : (
                <TaskFormBlock>
                    <InputStyled
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        placeholder="Текст задачи"
                    />
                    <Button
                        disabled={isLoading}
                        onClick={addTask}
                    >
                        {isLoading ? 'Добавление...' : 'Добавить задачу'}
                    </Button>
                    <ButtonGrey
                        onClick={toggleFormVisible}
                        grey
                    >
                        Отмена
                    </ButtonGrey>
                </TaskFormBlock>
            )}
        </TaskForm>
    );
};

export default AddTaskForm;
