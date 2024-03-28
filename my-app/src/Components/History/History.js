import React from 'react'
import styled from "styled-components";
import { useGlobalContext } from '../../context/GlobalContext';

function History() {
    const {transactionHistory} = useGlobalContext()

    const [...history]=transactionHistory()
    // const history=transactionHistory()

  return (
    <HistoryStyled>
        <h2>Recent History</h2>
        {history.map((item)=>{
            const {_id, title, amount, type}=item
            return(
                <div key={_id} className='history-item'>
                    <p style={{
                        color:type==='expense'?'red':'var(--color-green)'
                    }}>
                        {title}
                    </p>
                    <p style={{
                        color:type==='expense'?'red':'var(--color-green)'
                    }}>
                        {
                            type==='expense'? `-${amount<=0?0:amount}` : `+${amount<=0?0:amount}`
                         }
                    </p>
                </div>
            ) 
        })}
    </HistoryStyled>
  )
}
const HistoryStyled=styled.div`
    display:flex;
    flex-direction:column;
    gap:1rem;
    h2{
        margin:0px;
    }
    .history-item{
        background:#FCF6F9;
        border:2 px solid #FFFFFF;
        box-shadow:0px 1px 15px rgba(0,0,0,0.1);
        padding-left:0.5rem;
        padding-right:0.5rem;
        border-radius:20px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        width:85%;
    }

`;

export default History