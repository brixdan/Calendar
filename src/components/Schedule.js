import React from 'react';
import styled from 'styled-components/macro';
import moment from 'moment';
import PropTypes from "prop-types";

import Times from './Times';

import { Table, Tbody, Tr, Td } from '../jss/table';

const start_hour = 8;
const end_hour = 21;

const TdTimeLabel = styled(Td)`
  border: 2px solid transparent;
  position: relative;
`;

const TdTimeLabelText = styled.div`
  position: absolute;
  bottom: -12px;
  right: 10px;
  z-index: 1;
  color: ${props => props.theme.calendar_time_color};
  font-size: 18px;

  @media (max-width: 600px) {
    bottom: -9px;
    font-size: 12px;
  }
`;

const Schedule = (props) => {
        const startOfWeek = moment(props.date).startOf('isoWeek');
        const TimesOfDays = [];
        for (let cur_hour = start_hour + 1; cur_hour <= end_hour; cur_hour++) {
            let row = [];

            row.push(
                <TdTimeLabel key={-1}>
                    {' '}
                    <TdTimeLabelText>
                        {cur_hour !== start_hour && cur_hour !== end_hour
                            ? cur_hour.toString().padStart(2, '0') + ':00'
                            : ''}
                    </TdTimeLabelText>
                </TdTimeLabel>
            );

            for (let week_day = 0; week_day < 7; week_day++) {
                let date = moment(startOfWeek)
                    .add(week_day, 'days')
                    .add(cur_hour, 'hours');

                let date_str = date.format('YYYY-MM-DD');
                row.push(
                    <Times
                        key={week_day}
                        event_dates={props.event_dates[date_str]||{}}
                        date={date}
                        handleSelect={props.handleSelect}
                        selected_start_date={props.selected_start_date}
                    />
                );
            }
            TimesOfDays.push([row]);
        }

        return (
            <Table>
                <Tbody>
                    {TimesOfDays.map((row, i) => (
                        <Tr key={i}>{row}</Tr>
                    ))}
                </Tbody>
            </Table>
        );
}
Schedule.propTypes = {
    event_dates: PropTypes.object,
    date: PropTypes.object.isRequired,
    selected_start_date: PropTypes.object,
    handleSelect: PropTypes.func.isRequired,
}
export default Schedule
