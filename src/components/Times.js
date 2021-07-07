import React from 'react';
import styled from 'styled-components/macro';
import moment from 'moment';

import {Td} from '../jss/table';
import PropTypes from "prop-types";

const TdEvent = styled(Td)`
  border: 2px solid ${props => props.theme.calendar_border};
  background-color: ${props => props.selected && props.theme.selected_time_color};
`;

const TdEventActive = styled(TdEvent)`
  background-color: ${props => props.theme.active_time_color};
  cursor: pointer;
`;

const Times = ( props ) => {
        const start_date = moment(props.date).subtract(1, 'hours');
        const start_date_compare = moment(props.date)
            .subtract(1, 'hours')
            .subtract(1, 'seconds');
        const end_date = props.date;

        for (let x in props.event_dates) {
             if (moment(props.event_dates[x]).isBetween(start_date_compare, end_date)) {
                return (
                    <TdEventActive
                        onClick={e => props.handleSelect(e)}
                        data-start-date={moment(start_date).toISOString(true)}
                        selected={moment(props.selected_start_date).isSame(start_date)}
                        data-active={true}
                    />
                );
            }
        }

        return (
            <TdEvent
                onClick={e => props.handleSelect(e)}
                data-start-date={moment(start_date).toISOString(true)}
                selected={moment(props.selected_start_date).isSame(start_date)}
                data-active={false}
            >
                {props.week_day}
            </TdEvent>
        );
}
Times.propTypes = {
    event_dates: PropTypes.object,
    date: PropTypes.object.isRequired,
    selected_start_date: PropTypes.object,
    week_day: PropTypes.object,
    handleSelect: PropTypes.func.isRequired,
}

export default Times;
