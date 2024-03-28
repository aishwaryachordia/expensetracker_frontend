import React, { useEffect, useState } from "react";
import { InnerLayout } from "../../styles/Layouts";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext";
import { dateFormat } from "../../utils/dateFormat";

function Transactions() {
  const { incomes, expenses } = useGlobalContext();
  const [history, setHistory] = useState([...incomes, ...expenses]);
  const [toggleAmount, setToggleAmount] = useState(false);
  const [toggleDate, setToggleDate] = useState(false);

  useEffect(() => {
    history.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    setHistory([...history]);
  }, []);

  function sortByAmount() {
    if (!toggleAmount) {
      history.sort((a, b) => {
        return a.amount - b.amount;
      });
    } else {
      history.sort((a, b) => {
        return b.amount - a.amount;
      });
    }
    setToggleAmount(!toggleAmount);
    setHistory([...history]);
  }

  function sortByDate() {
    if (!toggleDate) {
      history.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    } else {
      history.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
    setToggleDate(!toggleDate);
    setHistory([...history]);
  }

  return (
    <DashBoardStyled>
      <InnerLayout>
        <h2>View Transactions</h2>
        <div className="grid-column">
          <div>
            <b>Name</b>
          </div>
          <div>
            <b>Amount</b>
            <i onClick={sortByAmount} className="fa-solid fa-filter"></i>
          </div>
          <div>
            <b>Date</b>
            <i onClick={sortByDate} className="fa-solid fa-filter"></i>
          </div>
          <div>
            <b>Category</b>
          </div>
          <div>
            <b>Reference</b>
          </div>
        </div>
        {history.map((item) => {
          return (
            <div className="grid-column">

            
              <div
                style={{
                  color: item.type === "expense" ? "red" : "var(--color-green)",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  color: item.type === "expense" ? "red" : "var(--color-green)",
                }}
              >
                {item.type === "expense"
                  ? `-${item.amount}`
                  : `+${item.amount}`}
              </div>
              <div>{dateFormat(item.date)}</div>
              <div>{item.category}</div>
              <div>{item.description}</div>
            </div>
            
          );
        })}
      </InnerLayout>
    </DashBoardStyled>
  );
}

const DashBoardStyled = styled.div`
  .grid-column {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
    margin-bottom: 10px;
    b {
      color: black;
    }
    i {
      cursor: pointer;
    }
  }
`;

export default Transactions;
