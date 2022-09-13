import React from 'react';
import styled from 'styled-components';

const BadgeStyled = styled.i`
    width: 10px;
    height: 10px;
    border-radius: 30px;
    display: inline-block;
    &:not(:last-child) {
        margin-right: 4px;
    }
    ${(props) => props.addCss}
`

const Badge = ({ color, onClick, addCss, active }) => (
    <BadgeStyled
        onClick={onClick}
        style={{backgroundColor: color}}
        addCss={addCss}
        active={active}
    />
);

export default Badge;
