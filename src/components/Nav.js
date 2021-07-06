import React  from 'react';
import styled from "styled-components/macro";
import moment from 'moment';

import arrow from '../img/svg/arrow.svg';
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  justify-content: space-between;
  position: fixed;
  max-width: 740px;
  width: 100%;
  background-color: ${props => props.theme.calendar_control_bg};
`;

const Month = styled.div`
  grid-column: 1 / 8;
  display: flex;
  justify-content:space-between;
  width: 100%;
`;

const NavDayName = styled.div`
  padding: 7px 0;
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const NavDayValue = styled.div`
  width: 50px;
  height: 50px;
  margin: auto;
  line-height: 50px;
  font-weight: bold;
  font-size: 26px;

  ${({ active }) =>
    active &&
    `
    border-radius:25px;
    background-color:red;
    color: #fff;
  `};

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
  }
`;

const NavArrow = styled.div`
  @media (max-width: 600px) {
    height: 45px;
  }
`;

const NavCurrentMonth = styled.div`
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const NextWeek = styled.div`
  background-image: url(${arrow});
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: 50%;
  width: 40px;
  height: 40px;
  margin: auto;
  cursor: pointer;
  background-color: ${props => props.theme.calendar_control_bg};

  @media (max-width: 600px) {
    background-size: 20px 20px;
    width: 30px;
    height: 30px;
  }
`;

const PrevWeek = styled(NextWeek)`
  transform: rotate(180deg);
`;

const Nav = ( props ) => {
    let startOfWeek = moment(props.date).startOf('isoWeek');
    let endOfWeek = moment(props.date).endOf('isoWeek');

    const days = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(
        <div
          onClick={e => props.changeDay(e)}
          key={day}
          data-date={day.toISOString()}
        >
          <NavDayName>{day.format('dd')[0]}</NavDayName>
          <NavDayValue active={moment().isSame(day, 'day')}>
            {day.date()}
          </NavDayValue>
        </div>
      );

      day = day.clone().add(1, 'd');
    }

    return (
        <Wrapper>
            <div />{days}
            <Month>
                <NavArrow />
                <NavArrow>
                    <PrevWeek onClick={props.prevWeek} />
                </NavArrow>
                <NavCurrentMonth>
                    {props.date.format('MMMM YYYY')}
                </NavCurrentMonth>
                <NavArrow>
                    <NextWeek onClick={props.nextWeek} />
                </NavArrow>
            </Month>
        </Wrapper>
    );
}

Nav.propTypes = {
  date: PropTypes.object.isRequired,
  changeDay: PropTypes.func.isRequired,
  prevWeek: PropTypes.func.isRequired,
  nextWeek: PropTypes.func.isRequired
}

export default Nav;
