import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
body{
    background-color: #0b0d0b;
    color: white;
    margin: 0;
    font-family: 'Roboto', sans-serif;
}

* {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;