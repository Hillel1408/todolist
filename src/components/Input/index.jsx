import styled from 'styled-components';

const Input = styled.input`
    background: #ffffff;
    border: 1px solid #efefef;
    border-radius: 4px;
    padding: 8px 12px;
    width: 100%;
    font-size: 14px;
    &:focus {
        border-color: #e6e1e1;
    }
`;

export default Input;