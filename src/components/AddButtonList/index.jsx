import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAddList } from '../../redux/todoSlice';
import axios from '../../axios';
import List from '../List';
import Badge from '../Badge';
import closeSvg from '../../assets/img/close.svg';
import styled, { css } from 'styled-components';
import Button from '../Button';
import Input from '../Input';

const addButtonCss = css`
    opacity: 0.4;
    transition: opacity 0.3s ease 0s;
    &:hover {
        opacity: 1;
    }
`;

const badgeCss = css`
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: 2px solid ${(props) => props.active ? '#525252' : 'transparent'};
`

const AddList = styled.div`
    position: relative;
`;

const AddButton = styled(Button)`
    width: 100%;
    margin-top: 10px;
`;

const Popup = styled.div`
    width: 235px;
    height: 148px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
    padding: 18px;
    position: absolute;
    top: 0;
    left: -10px;
    z-index: 1;
    &-close-btn {
        position: absolute;
        right: -5px;
        top: -5px;
        cursor: pointer;
        z-index: 2;
    }
`;

const CloseBtn = styled.img`
    position: absolute;
    right: -5px;
    top: -5px;
    cursor: pointer;
    z-index: 2;
`

const Badges = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
`

const AddListButton = ({ colors }) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    };

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка');
            return;
        }
        setIsLoading(true);
        axios
            .post('/lists', {
                name: inputValue,
                colorId: selectedColor,
            })
            .then(({ data }) => {
                const color = colors.filter((c) => c.id === selectedColor)[0];
                const listObj = { ...data, color, tasks: [] };
                dispatch(onAddList({ listObj }));
                onClose();
            })
            .catch(() => {
                alert('Ошибка при добавлении списка');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <AddList>
            <List
                onClick={() => setVisiblePopup(!visiblePopup)}
                items={[
                    {
                        addCss: addButtonCss,
                        icon: (
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 1V11"
                                    stroke="#868686"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M1 6H11"
                                    stroke="#868686"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ),
                        name: 'Добавить задачу',
                    },
                ]}
            />
            {visiblePopup && (
                <Popup>
                    <CloseBtn
                        onClick={() => onClose()}
                        alt="Close button"
                        src={closeSvg}
                    />
                    <Input
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        type="text"
                        placeholder="Название списка"
                    />
                    <Badges>
                        {colors.map((color) => (
                            <Badge
                                onClick={() => selectColor(color.id)}
                                color={color.hex}
                                key={color.id}
                                addCss={badgeCss}
                                active={selectedColor === color.id}
                            />
                        ))}
                    </Badges>
                    <AddButton onClick={addList}>
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </AddButton>
                </Popup>
            )}
        </AddList>
    );
};

export default AddListButton;
