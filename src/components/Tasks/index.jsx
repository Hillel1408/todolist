import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onEditListTitle } from '../../redux/todoSlice';
import axios from '../../axios';
import AddTaskForm from './addTaskForm';
import Task from './Task';
import editSvg from '../../assets/img/edit.svg';
import styled from 'styled-components';

const TasksStyled = styled.div`
    &:not(:last-of-type) {
        margin-bottom: 40px;
    }
`;

const NavLinkStyled = styled(NavLink)`
    text-decoration: none;
`;

const Title = styled.h2`
    font-family: 'Montserrat', -apple-system, system-ui, sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: #64c4ed;
    padding-bottom: 20px;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    align-items: center;
`;

const TitleImg = styled.img`
    ${Title}:hover & {
        opacity: 0.2;
    }
    opacity: 0;
    cursor: pointer;
    margin-left: 15px;
    &:hover {
        opacity: 0.8 !important;
    }
`;

const Items = styled.div`
    margin-top: 30px;
`;

const ItemsTitle = styled.h2`
    font-family: Montserrat;
    font-weight: bold;
    font-size: 22px;
    color: #c9d1d3;
    position: absolute;
    left: 50%;
    top: 50%;
`

const Tasks = ({ list, withoutEmpty }) => {
    const dispatch = useDispatch();
    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        if (newTitle) {
            dispatch(onEditListTitle({ list, newTitle }));
            axios
                .patch('/lists/' + list.id, {
                    name: newTitle,
                })
                .catch(() => {
                    alert('Не удалось обновить название');
                });
        }
    };

    return (
        <TasksStyled>
            <NavLinkStyled to={`/lists/${list.id}`}>
                <Title style={{ color: list.color.hex }}>
                    {list.name}
                    <TitleImg
                        onClick={editTitle}
                        src={editSvg}
                        alt="Иконка редактирования"
                    />
                </Title>
            </NavLinkStyled>
            <Items>
                {!withoutEmpty && list.tasks && !list.tasks.length && (
                    <ItemsTitle>Задачи отсутствуют</ItemsTitle>
                )}
                {list.tasks &&
                    list.tasks.map((task) => (
                        <Task key={task.id} list={list} {...task} />
                    ))}
                <AddTaskForm key={list.id} list={list} />
            </Items>
        </TasksStyled>
    );
};

export default Tasks;
