import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
 
  body {
    padding: 0;
    margin: 0;
    background-color: ${props => props.theme.body_bg};
    font-family: Roboto, sans-serif;
  }
`;