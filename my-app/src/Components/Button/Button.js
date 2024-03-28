import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';

//Button component is used in Forms.js and IncomeItem.js and frm there props are sent
function Button(props) {
  return (
    <ButtonStyled style={{
        background:props.bg,
        padding:props.bPad,
        borderRadius:props.bRad,
        color:props.color,
    }}  onClick={props.onClick}>
        {props.icon}
        {props.name}
    </ButtonStyled>
  )
}

const ButtonStyled= styled.button`
    outline:none;
    border:none;
    font-family:inherit;
    font-size:inherit;
    display:flex;
    align-items:center;
    gap:0.5rem;
    cursor:pointer;
    transition:all 0.4s ease-in-out;

`;

export default Button