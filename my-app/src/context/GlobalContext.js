import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL="http://localhost:5000/api/v1/"

const GlobalContext=React.createContext()

export const GlobalProvider=({children})=>{

    const [incomes,setIncomes]=useState([])
    const [expenses,setExpenses]=useState([])
    const [error,setError]=useState(null)

    const addIncome=async(income)=>{
        const response=await axios.post(`${BASE_URL}add-income`,income)
        getIncome()
        .catch((err)=>{
            setError(err.response.data.message)
        })
    }

    const getIncome=async()=>{
        const response=await axios.get(`${BASE_URL}get-income`)
        setIncomes(response.data)
    }

    const deleteIncome=async(id)=>{
        const res=await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncome()
    }

    const totalIncome=()=>{
        let totalIncome=0;
        incomes.map((income)=>{
            totalIncome=totalIncome+income.amount
        })
        return totalIncome
    }


    const addExpense=async(expense)=>{
        const response=await axios.post(`${BASE_URL}add-expense`,expense)
        getExpense()
        .catch((err)=>{
            setError(err.response.data.message)
        })
    }

    const getExpense=async()=>{
        const response=await axios.get(`${BASE_URL}get-expense`)
        setExpenses(response.data)
    }

    const deleteExpense=async(id)=>{
        const res=await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpense()
    }

    const totalExpense=()=>{
        let totalExpense=0;
        expenses.map((expense)=>{
            totalExpense=totalExpense+expense.amount
        })
        return totalExpense
    }

    const totalBalance=()=>{
        return totalIncome()-totalExpense()
    }

    const transactionHistory=()=>{
        //by using spread operator, individual objects of incomes and expenses are obtained and then concatenated to get one array
        const history=[...incomes,...expenses]
        history.sort((a,b)=>{
            return new Date(b.createdAt)-new Date(a.createdAt)
        })
        return history.slice(0,3)
    }


    return(
        //values are sent to Incomes.js where they are accessed
        <GlobalContext.Provider value={
            {addIncome,
             getIncome,
             deleteIncome,
             totalIncome,
             incomes,
             addExpense,
             getExpense,
             deleteExpense,
             totalExpense,
             totalBalance,
             expenses,
             transactionHistory,
             error
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext=()=>{
    return useContext(GlobalContext)
}