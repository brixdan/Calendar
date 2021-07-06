import React, {useState} from 'react';
import moment from "moment";
import styled  from 'styled-components/macro';
import Header from "./Header";
import Nav from "./Nav";
import Schedule from "./Schedule";
import Bottom from "./Bottom";


const CalendarNav = styled.div`
  background-color: ${props => props.theme.calendar_control_bg};
  border-top: 2px solid ${props => props.theme.calendar_border};
  border-bottom: 2px solid ${props => props.theme.calendar_border};
  position: fixed;
  z-index: 99;
  top: 80px;
  max-width: 740px;
  width: 100%;
`;

const CalendarMain = styled.div`
  margin-top: 140px;
  margin-bottom: 70px;

  @media (max-width: 600px) {
    margin-top: 100px;
  }
`;

const CalendarBottom = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 740px;
  height: 80px;
  z-index: 99;
  background-color: ${props => props.theme.calendar_control_bg};

`;

function Calendar () {

    let date = moment();
    const [state, setState] = useState({
        date: date,
        event_dates: {},
        selected_start_date: null,
        selected_active: false
    });

    const handleSelect = event => {
           setState({
            ...state,
            selected_start_date: moment(
                event.currentTarget.getAttribute('data-start-date')
            ),
            selected_active: event.currentTarget.getAttribute('data-active')
        });
    };

    const createEvent = () => {
        let input_string = window.prompt('Enter event time: YYYY-MM-DDTHH:mm:ss',"2021-07-07T13:00:00");
        let new_event = moment(input_string, 'YYYY-MM-DDTHH:mm:ss', true);

        if (new_event.isValid()) {
            let new_event_str = new_event.format('YYYY-MM-DD');
            setState( {
                ...state,
                event_dates: {
                    ...state.event_dates,
                    [new_event_str]:
                        new_event_str in state.event_dates
                            ? {new_event, ...state.event_dates[new_event_str]}
                            : {new_event}
                }
            });
        } else {
            alert('Date is invalid');
        }
    };
    const changeDay = event => {
        setState({
            ...state,
            date: moment(event.currentTarget.getAttribute('data-date'))
        });
    };

    const prevWeek = () => {
        setState({
            ...state,
            date: state.date.subtract(1, 'weeks')
        });
    };

    const nextWeek = () => {
        setState({
            ...state,
            date: state.date.add(1, 'weeks')
        });
    };

    const handleTodayClick = () => {
        setState({
            ...state,
            date: moment()
        });
    };

    const handleDelete = () => {
        if (state.selected_start_date && state.selected_active) {
            const date_str = moment(state.selected_start_date).format(
                'YYYY-MM-DD'
            );
            const events = [];
            for (let x in state.event_dates[date_str]) {
                let date = state.event_dates[x];
                const difference_from_start = state.selected_start_date.diff(
                    date,
                    'minutes'
                );

                if (difference_from_start > 0 || difference_from_start <= -60) {
                    events.push(date);
                }
            }

            let new_event_dates = { ...state.new_event_dates };
            new_event_dates[date_str] = events;
            setState({
                ...state,
                event_dates: new_event_dates,
                selected_start_date: null,
                selected_active: false
            });
        }
    };

    return (
        <>
            <Header createEvent={createEvent}/>
            <CalendarNav>
                <Nav
                    changeDay={changeDay}
                    prevWeek={prevWeek}
                    nextWeek={nextWeek}
                    date={state.date}
                />
            </CalendarNav>
            <CalendarMain>
                <Schedule
                    event_dates={state.event_dates}
                    date={state.date}
                    handleSelect={e => handleSelect(e)}
                    selected_start_date={state.selected_start_date}
                />
            </CalendarMain>
            <CalendarBottom>
                <Bottom
                    handleTodayClick={handleTodayClick}
                    deletable={state.selected_active}
                    handleDelete={handleDelete}
                />
            </CalendarBottom>
        </>
    );
}

export default Calendar;
