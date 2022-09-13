import styled, {css} from 'styled-components';

const greyCss = css`
    background-color: #f4f6f8;
    color: #9c9c9c;
    &:hover {
        background-color: #d8dfe6;
    }
    &:active {
        background: #cbd5de;
    }
`

const Button = styled.button`
    background: #4dd599;
    border-radius: 4px;
    color: #ffffff;
    border: 0;
    padding: 10px 20px;
    transition: background-color 0.3s ease 0s;
    cursor: pointer;
    &:hover {
        background: #2fc583;
    }
    &:active {
        background: #2bb578;
    }
    &:disabled {
        background: #d8d8d8;
    }
    ${(props) => props.grey && greyCss}
`;

export default Button;