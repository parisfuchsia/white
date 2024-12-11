import { motion } from 'framer-motion';
import  Chart  from 'react-apexcharts';
import { lazy, Suspense, useEffect, useState, useMemo } from 'react';
import { fetchHistoryList } from '../state/slice.ts';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './modal.tsx';


const History = lazy(() => import('./transactionHistory.tsx'));


export default function Summary(){

  const { transactions } = useSelector(state => state.transac);
  const { theme } = useSelector(state => state.theme);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchHistoryList())
  }, []);
  
  const getTotalAmount = (arr, target) => {
    return arr.reduce((total, item) => {
      return item.type === target ? total + parseFloat(item.amount) : total
    }, 0)
  }
  
  const totalIncome = useMemo(() => {
    return transactions?.length > 0 && getTotalAmount(transactions, 'Income')
  }, [transactions])
  
  const totalSavings = useMemo(() => {
    return transactions?.length > 0 && getTotalAmount(transactions, 'Savings')
  }, [transactions])
  
  const totalExpenses = useMemo(() => {
    return transactions?.length > 0 && getTotalAmount(transactions, 'Expenses')
  }, [transactions]);
  
  const totalBalance = useMemo(() => {
    return transactions.reduce((total, item) => {
      return item.type === "Savings" || item.type === "Income" ? total + parseFloat(item.amount) : total
    }, 0)
  }, [transactions])
 
  const parentVariant = {
    hidden:{
      opacity:0,
      transition:{
        duration:0.25,
        staggerChildren:0.25,
        staggerDirection:-1,
        when:"afterChildren"
      }
    },
    visible :{
      opacity:1,
      transition:{
        duration:0.25,
        staggerChildren:0.25,
        when:"beforeChildren"
      }
    }
  }
  const childVariant = {
    hidden:{ opacity:0 },
    visible :{ opacity:1 }
  }
  
  const today = new Date();
  
  const options = {
    chart:{
      type:"pie"
    },
    labels:['Income', 'Savings'],
    series:[totalIncome || 0.00001, totalSavings || 0.00001],
    dataLabels:{
      enabled:true,
      style:{
        colors:['#000000'],
        fontSize:"16px"
      },
      dropShadow:{
        enabled:false
      }
    },
    legend:{
      position:"bottom",
      labels:{
        colors:theme === 'dark' ? "#FFFFFF" : '#000000'
      }
    },
    colors:['#DBEAFE','#99F6E4']
  }
  
  return <motion.div 
  variants = {parentVariant}
  initial = "hidden"
  animate = "visible"
  exit = "hidden"
  
  className = 'grid sm:w-8/12 w-full grid-cols-1 sm:grid-cols-2 gap-4'>
    <motion.div
    variants = {childVariant}
  
  className = 'act z-10 w-full rounded-lg bg-neutral-50 dark:bg-gray-900 shadow-md px-6 py-5 flex flex-col items-center justify-center gap-2'
    >
     
      <div className = 'p-3 rounded-lg bg-gradient-to-tr from-blue-100 to-teal-200 w-full flex flex-col justify-start gap-2'>
        <p className = 'text-xl flex sm:flex-col sm:items-start items-center gap-2 italic tracking-wide'>Total Balance<span className = 'text-xs text-gray-500'> As of {(today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate())}</span></p>
      <p className = 'text-3xl leading-tight tracking-tight font-bold'>${totalBalance || 0}</p>
      </div>
       <Chart height = {200} options = {options} series = {options.series} type = "pie" />
    </motion.div>
    <div className = 'flex flex-col w-full gap-2'>
    <motion.div 
    variants = {childVariant}
    
    className = 'shadow-md act z-10 bg-neutral-50 dark:bg-gray-900 dark:text-neutral-100 rounded-lg py-3 px-6 flex flex-col items-start justify-center gap-2'>
      <p className = 'text-lg tracking-wide flex items-center gap-1 italic'>Income<span className = 'text-xs text-gray-600 dark:text-gray-300 '>Total</span></p>
      <div className = 'w-full'>
        <p className = 'text-2xl leading-tight tracking-tight font-bold'>${totalIncome || 0}</p>
      </div>
    </motion.div>
    <motion.div
    variants = {childVariant}
   
    className = 'bg-neutral-50 dark:bg-gray-900 dark:text-neutral-100 shadow-md act z-10 rounded-lg py-3 px-6 flex flex-col items-start justify-center gap-2'>
            <p className = 'italic text-lg flex items-center gap-1 tracking-wide'>Savings<span className = 'text-xs text-gray-600 dark:text-gray-300 '>Total</span></p>
      <div className = ' w-full'>
                <p className = 'text-2xl leading-tight tracking-tight font-bold'>${totalSavings || 0}</p>

      </div>
    </motion.div>
    <motion.div
    variants = {childVariant}
    
    className = 'shadow-md act z-10 bg-neutral-50 dark:bg-gray-900 dark:text-neutral-100 rounded-lg py-3 px-6 flex flex-col items-start justify-center gap-2'>
            <p className = 'italic tracking-wide text-lg flex items-center gap-1'>Expenses<span className = 'text-xs text-gray-600 dark:text-gray-300 '>Total</span></p>
      <div className = 'w-full'>
                <p className = 'text-2xl leading-tight tracking-tight font-bold'>${totalExpenses || 0}</p>
      </div>
    </motion.div>
    </div>
    <motion.div
    variants = {childVariant}
    className = "w-full col-span-1 sm:col-span-2 flex justify-center"
    >
          <History total = {{expenses:totalExpenses, income: totalIncome, savings: totalSavings}}  parent = {parentVariant} child = {childVariant
          }/>
    </motion.div>
  </motion.div>
}