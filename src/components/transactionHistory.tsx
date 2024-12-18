import Chart from 'react-apexcharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchHistoryList, fetchToday, fetchThisMonth, fetchAllTime, fetchThisWeek } from '../state/slice.ts';
import { GoTag } from 'react-icons/go';
import { v4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import FilterModal from './filterModal.tsx';

export default function History({parent, child}){
  const [type, setType] = useState("All");
  const [open, setOpen] = useState(false);
  
  const historyList = useSelector(state => state.transac.filteredTransactions.length > 0 && state.transac.isFilterOn ? state.transac.filteredTransactions : state.transac.isFilterOn ? [] : state.transac.transactions);
  
  const { barChartDetails } = useSelector(state => state.transac);
  const { transactions } = useSelector(state => state.transac);
  const { theme } = useSelector(state => state.theme);
  
  const colors = useMemo(() => {
    return theme === "light" ? "#000000" : "#FFFFFF"
  }, [theme]);
  
  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    labels:['Income', 'Savings', 'Expenses'],
    plotOptions: {
      bar: {
        horizontal:true,
        columnWidth: '90%',
        distributed: true,
      },
    },
    dataLabels:{
      enabled:true,
      style:{
        colors:["#000000"],
        fontSize:"16px"
      }
    },
    yaxis:{
      labels:{
        style:{
          colors:colors
        }
      }
    },
    xaxis:{

      labels:{
        style:{
          colors: colors
        }
      }
    },
    legend:{
      position:"bottom",
      labels:{
        colors:colors
      }
    },
    colors: ['#DBEAFE', '#99F6E4', '#FFB6C1'],
    
  };
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(type === 'All'){
      dispatch(fetchAllTime());
    }else if(type === 'Today'){
      dispatch(fetchToday());
    }else if(type === 'This Month'){
      dispatch(fetchThisMonth());
    }else if(type === "This Week"){
      dispatch(fetchThisWeek());
    }
  }, [type, transactions])
  
  useEffect(() => {
    if(open){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = ""
    }
  }, [open])
  
  const totalReducer = (target) => {
    if(barChartDetails?.length > 0){
      return barChartDetails.reduce((total, next) => {
        return next.type === target ? parseFloat(next.amount) + total : total;
      }, 0)
    }else{
      return;
    }
  };
  
  const totalIncome = useMemo(() => {
    return totalReducer('Income')
  }, [barChartDetails])
  const totalExpenses = useMemo(() => {
    return totalReducer('Expenses')
  }, [barChartDetails])
  const totalSavings = useMemo(() => {
    return totalReducer('Savings')
  }, [barChartDetails])
  
  useEffect(() => {
    dispatch(fetchHistoryList());
  }, []);
  
  const chartSeries = [
    {
      name:"Amount",
      data: [totalIncome || 0, totalSavings || 0, totalExpenses || 0], 
    },
  ];
  
  //USER INTERFACE
  return <div className = 'w-full'>
      
    
    <motion.div
  className = 'flex w-full flex-col items-center my-2'>
    <div className = 'w-full dark:bg-gray-900 dark:text-neutral-100 bg-neutral-50 shadow-md flex rounded-lg flex-col items-center justify-center p-5'>
      <AnimatePresence>
              {
        open && <div className = 'z-40'>
          <FilterModal onClose = {() => setOpen(false)}/>
        </div>
      }
      </AnimatePresence>
      <Chart  type = "bar" height = {200} width = "350" options = {chartOptions} series = {chartSeries}  />
          <div className = 'w-full gap-2 flex justify-start items-center my-2'>
      <select
      value = {type} onChange = {(e) => setType(e.target.value)}className = 'bg-neutral-50 dark:bg-gray-900 p-1 dark:text-neutral-100 act  text-xs'>
        <option value = "All">
          All 
        </option>
        <option value = "Today">
          Today
        </option>
        <option value = "This Week">
          This week
        </option>
        <option value = "This Month">
          This month
        </option>
        
      </select>
    </div>
    </div>
  </motion.div>
  <p className = 'w-full flex gap-5 items-center text-gray-600 dark:text-gray-300  text-xs justify-center '>Transactions      <button onClick = {() => setOpen(true)} className = 'text-xs truncate btn bg-neutral-50 dark:bg-gray-900 text-gray-800 dark:text-neutral-100'>Filter</button></p>
  <motion.div
  variants = {parent} 
  initial = "hidden"
  animate = "visible"
  exit = "hidden"
  className = 'flex flex-col gap-2 mt-2 mb-5'>
    {
     historyList?.length > 0 ? historyList?.slice()?.reverse()?.map(transac => {
        return <motion.div
        key = {transac?.id}
        variants = {child} 
        whileTap = {{opacity:"30%"}}
        className = 'bg-neutral-50 dark:bg-gray-900 dark:text-neutral-100 py-3 px-6 rounded-lg shadow-md'
        >
        <NavLink to = {`/transaction/detail/${transac?.id}`}className = ' flex justify-between items-center'>
          <div className = 'flex flex-col gap-2'>
                        <p className = 'text-xl leading-tight tracking-tight font-bold'>${transac?.amount}</p>
            <p className = 'text-md '>{transac?.type }</p>
            <div className = 'truncate flex gap-1'>
              {
                transac?.tags?.length > 0 ? transac.tags.map(tag => {
                  return <p className = 'underline text-xs'>{tag}</p>
                }) : <p className = 'text-xs text-gray-500'>No tag provided</p>
              }
            </div>
                      <p className = ' flex gap-3 text-xs text-gray-600 dark:text-gray-400'>Date: {transac?.date}<span> Time: {transac?.time} </span></p>
          </div>
          <div>
            <div className = {`size-6 rounded-tl-xl rounded-br-xl flex items-center justify-center ${transac?.type === "Income" ? "bg-[#00FFFF]" : transac?.type === "Savings" ? "bg-[#7FFFD4]" : "bg-[#DE3163]"}`}>
              <div className = 'size-4 rounded-tl-lg rounded-br-lg flex items-center justify-center bg-white '>
                <div className = 'size-2 bg-gray-800 rounded-full'>
                  
                </div>
              </div>
            </div>
          </div>
        </NavLink>
        </motion.div>
      }) : <p className = 'text-xs text-gray-600 dark:text-gray-300 w-full text-center'>No transactions recorded</p>
    }
  </motion.div>
  </div>
}
