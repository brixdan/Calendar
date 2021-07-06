import React from 'react';
import styled from 'styled-components/macro';

const Controls = styled.div`
  font-size: 28px;
  color: red;
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Today = styled.div`
  padding-left: 50px;
  padding-top: 25px;
`;

const TodayText = styled.span`
  cursor: pointer;
`;

const Delete = styled.div`
  padding-right: 50px;
  padding-top: 25px;
`;

const DeleteText = styled.span`
  cursor: pointer;
`;
const Bottom = (props) => {
    const renderDelete = () => {
        if (props.deletable === 'true') {
            return (
                <Delete>
                    <DeleteText onClick={() => props.handleDelete()}>
                        Delete
                    </DeleteText>
                </Delete>
            );
        } else {
            return <div/>;
        }
    };
    return (
        <Controls>
            <Today>
                <TodayText onClick={() => props.handleTodayClick()}>
                    Today
                </TodayText>
            </Today>
            {renderDelete()}
        </Controls>

    );
}

export default Bottom;
