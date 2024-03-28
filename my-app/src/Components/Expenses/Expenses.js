import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/GlobalContext";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import Button from "../Button/Button";
import { mic } from "../../utils/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Tooltip } from "react-tooltip";
import ExpenseForm from "./ExpenseForm";

function Expenses() {
  const { addIncome, expenses, getExpense, totalExpense,deleteExpense } = useGlobalContext();
  const [isVoiceOn, setisVoiceOn] = useState(false);

  useEffect(() => {
    getExpense();
  }, []);


  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition();


  const speechRec = async () => {
    if (!isVoiceOn) {
      await SpeechRecognition.startListening({ continuous: true });
      setisVoiceOn(true);
    } else {
      SpeechRecognition.stopListening();
      resetTranscript();
      setisVoiceOn(false);
    }
  };

  return (
    <IncomeStyled>
      <InnerLayout>
        <h2 className="speechmic">
          Expenses
          <div
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Enter title amount date category reference"
          >
            <Button
              icon={mic}
              bPad={" .3rem 0.3rem"}
              bRad={"30px"}
              bg={"var(--color-accent"}
              color={"#fff"}
              onClick={speechRec}
            />
          </div>
        </h2>
        <Tooltip id="my-tooltip" />
        <h4 className="total-income">Total Expense:<span>€{totalExpense()}</span></h4>

        <div className="income-content">
          <div className="form-container">
            <ExpenseForm transcript={transcript} />
          </div>
          <div className="incomes">
            {expenses.map((expense) => {
              const { _id, title, amount, date, category, description, type } =
                expense;
              //sending props to IncomeItem.js(can also be written as income.title, income.amount,)
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  category={category}
                  indicatorColor="var(--color-green)"
                  type={type}
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  ${"" /* used to prevent overflow of content */}
  display:flex;
  overflow: auto;
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
  .speechmic {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:space-between;
    margin:10px;
    i {
      font-size: 21px;
    }
  }
  .total-income{
    display:flex;
    justify-content:center;
    align-items:center;
    background:#FCF6F9;
    border:2px solid #FFFFFFF;
    box-shadow:0px 1px 15px rgba(0,0,0,0.06);
    border-radius:20px;
    margin:1rem 0;
    font-size:1.5rem;
    gap:.5rem;
    span{
      font-size:1.5rem;
      font-weight:800;
      color:var(--color-green);
    }
  }
`;

export default Expenses;
