import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        list-style: none;
        outline: none;
        font-family: 'Roboto', -apple-system, system-ui, sans-serif;
        box-sizing: border-box;
    }
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      cursor: default;
      min-width: 320px;
    }
`;