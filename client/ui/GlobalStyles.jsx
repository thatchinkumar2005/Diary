import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        margin : 0px;
        padding : 0px;
        box-sizing : border-box;
    }
    body{
        min-height : 100vh;
        font-size : 14px;
        font-family : sans-serif;
    }

    button,input,textarea{
        outline : none;
        box-shadow : none;
        border : none;
    }

    a{
        text-decoration : none;
        color : black;
    }
    
`;
