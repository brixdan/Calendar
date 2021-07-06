import React from 'react';
import {Global} from './jss/global';
import styled, {ThemeProvider} from 'styled-components/macro';
import {theme} from './jss/theme';
import Calendar from "./components/Calendar";

const Wrapper = styled.div`
  text-align: center;
  max-width: 740px;
  background-color: ${props => props.theme.calendar_bg};
  margin: auto;
  position: relative;
`;

function App() {

    return (
        <ThemeProvider theme={theme}>
            <Global/>
            <Wrapper>
                <Calendar />
            </Wrapper>
        </ThemeProvider>
    );
}

export default App;
