import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { List, AddButtonList, Tasks } from './components';
import { fetchLists, fetchColors } from './redux/todoSlice';
import styled from 'styled-components';

const TodoList = styled.div`
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 760px;
    height: calc(100vh - 100px);
    transform: translate(-50%, -50%);
    box-shadow: 1px 2px 20px #f3f3f3;
    border-radius: 10px;
    border: 1px solid #f1f1f1;
    font-size: 14px;
`;

const TodoSidebar = styled.div`
    background-color: #f4f6f8;
    width: 254px;
    height: 100%;
    border-right: 1px solid #f1f1f1;
    padding: 60px 20px 100px 20px;
    overflow-y: auto;
`;

const TodoTasks = styled.div`
    flex: 1;
    padding: 60px;
    overflow: auto;
`;

function App() {
    const [activeItem, setActiveItem] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { lists, colors } = useSelector((state) => state.todos);

    useEffect(() => {
        dispatch(fetchLists());
        dispatch(fetchColors());
    }, []);

    useEffect(() => {
        const listId = location.pathname.split('lists/')[1];
        if (lists) {
            const list = lists.find((list) => list.id === Number(listId));
            setActiveItem(list);
        }
    }, [lists, location.pathname]);

    return (
        <TodoList>
            <TodoSidebar>
                <List
                    onClickItem={() => {
                        navigate(`/`);
                    }}
                    items={[
                        {
                            active: location.pathname === '/',
                            icon: (
                                <svg
                                    width="14"
                                    height="12"
                                    viewBox="0 0 14 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.96 5.10001H5.74001C5.24321 5.10001 5.20001 5.50231 5.20001 6.00001C5.20001 6.49771 5.24321 6.90001 5.74001 6.90001H10.96C11.4568 6.90001 11.5 6.49771 11.5 6.00001C11.5 5.50231 11.4568 5.10001 10.96 5.10001ZM12.76 9.60001H5.74001C5.24321 9.60001 5.20001 10.0023 5.20001 10.5C5.20001 10.9977 5.24321 11.4 5.74001 11.4H12.76C13.2568 11.4 13.3 10.9977 13.3 10.5C13.3 10.0023 13.2568 9.60001 12.76 9.60001ZM5.74001 2.40001H12.76C13.2568 2.40001 13.3 1.99771 13.3 1.50001C13.3 1.00231 13.2568 0.600006 12.76 0.600006H5.74001C5.24321 0.600006 5.20001 1.00231 5.20001 1.50001C5.20001 1.99771 5.24321 2.40001 5.74001 2.40001ZM2.86001 5.10001H1.24001C0.743212 5.10001 0.700012 5.50231 0.700012 6.00001C0.700012 6.49771 0.743212 6.90001 1.24001 6.90001H2.86001C3.35681 6.90001 3.40001 6.49771 3.40001 6.00001C3.40001 5.50231 3.35681 5.10001 2.86001 5.10001ZM2.86001 9.60001H1.24001C0.743212 9.60001 0.700012 10.0023 0.700012 10.5C0.700012 10.9977 0.743212 11.4 1.24001 11.4H2.86001C3.35681 11.4 3.40001 10.9977 3.40001 10.5C3.40001 10.0023 3.35681 9.60001 2.86001 9.60001ZM2.86001 0.600006H1.24001C0.743212 0.600006 0.700012 1.00231 0.700012 1.50001C0.700012 1.99771 0.743212 2.40001 1.24001 2.40001H2.86001C3.35681 2.40001 3.40001 1.99771 3.40001 1.50001C3.40001 1.00231 3.35681 0.600006 2.86001 0.600006Z"
                                        fill="#7C7C7C"
                                    />
                                </svg>
                            ),
                            name: 'Все задачи',
                            isActive: 'true',
                        },
                    ]}
                />
                {lists ? (
                    <List
                        items={lists}
                        isRemovable
                        onClickItem={(list) => {
                            navigate(`/lists/${list.id}`);
                        }}
                        activeItem={activeItem}
                    />
                ) : (
                    'Загрузка...'
                )}
                {colors && <AddButtonList colors={colors} />}
            </TodoSidebar>
            <TodoTasks>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            lists &&
                            lists.map((list) => {
                                return (
                                    <Tasks
                                        key={list.id}
                                        list={list}
                                        withoutEmpty
                                    />
                                );
                            })
                        }
                    />
                    <Route
                        path="/lists/:id"
                        element={
                            lists && activeItem && <Tasks list={activeItem} />
                        }
                    />
                </Routes>
            </TodoTasks>
        </TodoList>
    );
}

export default App;
