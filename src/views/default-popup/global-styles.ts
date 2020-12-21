import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    #document-body {
        width: 400px;
        height: 400px;
        margin: auto;
    }
    
    .full_aside {
        position: fixed;
        background-color: wheat;
        height: 100vh;
        width: 30%;
    }
    
    .content {
        padding: 20px;
    }
`;

export default GlobalStyles;