import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useGlobalContext } from '../../context/GlobalContext'
import { plus } from '../../utils/icons'
import Button from '../Button/Button'


function ExpenseForm(props) {

    const {addExpense,getExpense,error}=useGlobalContext()
    const [inputState,setInputState]=useState({
        title:'',
        amount:'',
        date:'',
        category:'',
        description:'',
    })

    const {title,amount, date, category,description}=inputState;
    //inputState.title, inputState.amount,

    const handleInput=(event)=>{
        setInputState({...inputState,[event.target.name]:event.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        addExpense(inputState)
        setInputState({
        title:'',
        amount:'',
        date:'',
        category:'',
        description:'',
        })
    }

    useEffect(() => {
        if(props.transcript!=null){
            if(props.transcript.includes("title")&&props.transcript.includes("amount")&&props.transcript.includes("date")&&props.transcript.includes("category")&&props.transcript.includes("reference")){
                let output=props.transcript.match("title(.*)amount(.*)date(.*)category(.*)reference(.*)");
                console.log(output)
                setInputState({...inputState,title:output[1],amount:output[2],date:output[3],category:output[4],description:output[5]})
            }
           
        }
      }, [props.transcript]);
    
  return (
    <FormStyled onSubmit={handleSubmit}>
        {error&& <p className='error'>{error}</p>}
    <div className='input-control'>
        <input type='text'
                required value={title}
                //name is key of array inputstate
                name={'title'}
                placeholder='Title'
                onChange={handleInput} 
        />
        <div>{props.transcript}</div>
    </div>
    <div className='input-control'>
        <input type='text'
                required value={amount}
                //name is key of array inputstate
                name={'amount'}
                placeholder='Amount'
                onChange={handleInput} 
        />
    </div>

    <div className='input-control'>
        <DatePicker
        id='date'
        placeholderText='Enter a date'
        required selected={date}
        dateFormat='dd/MM/yyyy'
        onChange={(date)=>{
            setInputState({...inputState,date:date})
        }}
        />
    </div>

    <div className='selects input-control'>
    <select required value={category} name='category' id='category' onChange={handleInput}>
        <option value="" disabled>Select Option</option>
        <option value="education" >Education</option>
        <option value="groceries" >Groceries</option>
        <option value="subscriptions" >Subscriptions</option>
        <option value="takeaways" >Takeaways</option>
        <option value="clothing" >Clothing</option>
        <option value="travelling" >Travelling</option>
        <option value="others" >Other</option>
    </select>
    </div>

    <div className='input-control'>
        <textarea name='description' required value={description} placeholder='Add a reference' id='description' cols='30' rows='4' onChange={handleInput}></textarea>
    </div>  

    <div className='submit-btn'>
    <Button
        name={'Add Expense'}
        icon={plus}
        bPad={' .8rem 1.6rem'}
        bRad={'30px'}
        bg={'var(--color-accent'}
        color={'#fff'}
        />
    </div>
    
    </FormStyled>
  )
}

const FormStyled=styled.form`
    display:flex;
    flex-direction:column;
    gap:2rem;
    input, textarea, select{
        font-family:inherit;
        font-size:inherit;
        outline:none;
        border:none;
        padding:0.5rem 1rem;
        border-radius: 5px;
        border:2px solid #fff;
        background:transparent;
        resize:none;
        box-shadow:0px 1px 15px rgba(0,0,0,0.06);
        color:rgba(34,34,96,0.9);
        &::placeholder{
            color:rgba(34,34,96,0.4);
        }
    }
    .input-control{
        .react-datepicker-wrapper{
            width:100%;
        }
        input{
            width:90%;
        }
    }
    .selects{
        display:flex;
        justify-content:flex-end;
        select{
            color:rgba(34,34,96,0.4);
            &:focus, &:active{
                color:rgba(34,34,96,1);
            }
        }
    }

    .submit-btn{
        button{
           box-shadow:0px 1px 15px rgba(0,0,0,0.06);
           &:hover{
            background:var(--color-green) !important;
           } 
        }
    }
`;

export default ExpenseForm