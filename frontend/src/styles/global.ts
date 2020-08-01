import { createGlobalStyle } from 'styled-components';
import { shade } from 'polished';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #f9d56e;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, span {
    font: 16px Roboto, sans-serif;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
    background-color: #e8505b;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#e8505b')};
    }
  }
`;
