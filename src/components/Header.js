import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components/macro';

import plus from '../img/svg/plus.svg';

const Wrapper = styled.header`
  height: 80px;
  position: sticky;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.calendar_bg};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Add = styled.div`
  margin-right: 50px;
  width: 24px;
  height: 24px;
  background-image: url(${plus});
  background-size: contain;
  cursor: pointer;
`;

const HeaderText = styled.div`
  font-size: 24px;
  margin-left: 50px;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Header = (props) => {
    return (
            <Wrapper>
                <HeaderText>Calendar</HeaderText>
                <Add onClick={props.createEvent} />
            </Wrapper>
    );
}

Header.propTypes = {
    createEvent: PropTypes.func.isRequired
}

export default Header
