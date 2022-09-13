import React from 'react';
import { useDispatch } from 'react-redux';
import { onRemove } from '../../redux/todoSlice';
import axios from '../../axios';
import Badge from '../Badge';
import removeSvg from '../../assets/img/remove.svg';
import styled, {css} from 'styled-components';

const ListStyled = styled.ul`
    margin-bottom: 30px;
`;

const activeCss = css`
    background: #ffffff !important;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
`

const ListItem = styled.li`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px 12px;
    margin-bottom: 5px;
    border-radius: 4px;
    transition: background-color 0.15s ease-in-out;
    ${(props) => props.active && activeCss}
    ${(props) => props.addCss}
    &:hover {
        background: rgba(255, 255, 255, 0.5);
    }
`;

const ListItemIcon = styled.i`
    margin-right: 8px;
    display: inline-flex;
`

const ListItemText = styled.span`
    flex: 1 1 auto;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 160px;
    white-space: nowrap;
`

const ListItemRemoveIcon = styled.img`
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
    ${ListItem}:hover & {
        opacity: 0.2;
    };
    
    &:hover {
        opacity: 0.8 !important;
    }
`;

function List({ items, isRemovable, onClick, onClickItem, activeItem }) {
    const dispatch = useDispatch();

    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios
                .delete('/lists/' + item.id)
                .then(() => {
                    dispatch(onRemove(item.id));
                })
                .catch((error) => {
                    alert('Ошибка при удалении списка');
                });
        }
    };

    return (
        <ListStyled onClick={onClick}>
            {items.map((item, index) => (
                <ListItem
                    onClick={onClickItem ? () => onClickItem(item) : null}
                    key={index}
                    addCss={item.addCss}
                    active={item.active
                        ? item.active
                        : activeItem && activeItem.id === item.id}
                >
                    <ListItemIcon>
                        {item.icon ? (
                            item.icon
                        ) : (
                            <Badge color={item.color.hex} />
                        )}
                    </ListItemIcon>
                    <ListItemText>
                        {item.name}
                        {item.tasks && ' (' + item.tasks.length + ')'}
                    </ListItemText>
                    {isRemovable && (
                        <ListItemRemoveIcon
                            src={removeSvg}
                            alt="Удалить список"
                            onClick={() => removeList(item)}
                        />
                    )}
                </ListItem>
            ))}
        </ListStyled>
    );
}

export default List;
