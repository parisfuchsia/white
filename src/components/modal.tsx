import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GoTag } from 'react-icons/go';
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { fetchHistoryList, addTransactions } from '../state/slice.ts';
export default function Modal({isOpen, onClose}){
  const [selected, setSelected] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const today = new Date();
  const [dataFormat, setDataFormat] = useState({
    amount:0,
    tags:[],
    desc:"",
    type: "Income",
    date: today.getFullYear() + "-" +(today.getMonth() + 1 )+ "-" + today.getDate(),
    time: today.getHours() + ":" + today.getMinutes(),
    id: v4()
  })
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataFormat(prev => {
      return {
        ...prev, [name] : value
      }
    })
  }
  
  const Tags = ["Food", "Travel", "Groceries", "Salary","Others"];

  const handleClick = (getLabel) => {
    let cpySelected = {...selected};
    let cpyDataFormat = {...dataFormat};
    let cpyTags = [...dataFormat.tags];
    
    const tagIndex = cpyTags.indexOf(getLabel);
    
    if(tagIndex !== -1){
      cpyTags.splice(tagIndex, 1);
    }else{
      cpyTags.push(getLabel);
    }
    
    cpyDataFormat = {...cpyDataFormat, tags:[...cpyTags]};
    setDataFormat(cpyDataFormat);
    cpySelected = { ...cpySelected, [getLabel] : !cpySelected[getLabel]
    }
    setSelected(cpySelected);
  }
 
  
  const formHandler = async(e) => {
    e.preventDefault();
    let savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    const { amount, type } = dataFormat;
    
    if(amount && type){
      savedTransactions.push(dataFormat);
      await dispatch(addTransactions(savedTransactions));
      await dispatch(fetchHistoryList());
    };
    onClose();
    
  }
 
  
  return <motion.div 
  initial = {{ opacity:0 }}
  animate = {{ opacity:1 }}
  exit = {{ opacity:0 }}
  onClick = {onClose}
  className = 'bg-[#00000090] z-40 inset-0 fixed flex items-center flex-col justify-center'
  >
    <motion.div 
    initial = {{ opacity:0 }}
  animate = {{ opacity:1 }}
  exit = {{ opacity:0 }}
    onClick = {(e) => e.stopPropagation()}className = 'bg-neutral-100 z-20 w-11/12 sm:w-8/12 flex flex-col gap-2 p-8 dark:bg-gray-800 shadow-md rounded-lg justify-center '>
    <p className = 'text-xs text-gray-600 dark:text-gray-300  text-center'>Add Transaction</p>
    <form onSubmit = {formHandler} className = 'flex flex-col gap-4'>
      <div className = 'w-full flex flex-col gap-1'>
      <p className = 'text-xs text-gray-600 dark:text-gray-300 '>Amount</p>
      <input name = "amount" onChange = {handleChange} type = "number" className = 'focus:outline-[#99F6E4] focus:outline-4 focus:outline w-full p-2  rounded' placeholder = 'Amount' />
      </div>
      <div className = 'w-full flex flex-col gap-1'>
      <p className = 'text-xs text-gray-600 dark:text-gray-300 '>Description</p>
      <textarea rows = "3" placeholder = "Description" name = "desc"  className = 'focus:outline-[#99F6E4] focus:outline-4 focus:outline w-full p-2 rounded' onChange = {handleChange} ></textarea>
     </div>
     <div className = 'flex flex-col gap-1'>
      <p className = 'text-xs text-left flex items-center gap-1 text-gray-600 dark:text-gray-300 '><GoTag />Tags</p>
      <div className = 'grid grid-cols-3 sm:grid-cols-4 gap-2 text-sm'>
       {
         Tags.map(item => <div key = {item} onClick = {() => handleClick(item)} className = {`outline  p-1 rounded truncate text-center gap-1 ${
           !selected[item] ? 'bg-white outline-teal-100' : 'bg-teal-100 outline-teal-200'
         } `}>
           {item}
         </div>)
       }
       </div>
      </div>
      <div className = 'flex flex-col'>
        <p className = 'text-xs text-gray-600 dark:text-gray-300  '>Count as:</p>
        <div className = 'flex flex-col gap-1 text-gray-800 dark:text-neutral-100'>
        <div className = 'flex gap-2'>
                  <input onChange = {handleChange} value = "Income" checked = {dataFormat.type === "Income"} name = "type"  type = "radio"/>
                                    <label>Income</label>
        </div>
        <div className = 'flex gap-2'>

                  <input onChange = {handleChange} value = "Savings" name = "type" type = "radio"/>
                                    <label>Savings</label>
        </div>
        <div className = 'flex gap-2'>
                  <input onChange = {handleChange} value = "Expenses" className = 'focus:bg-yellow-200' name = "type" type = "radio"/>
                                    <label>Expenses</label>
        </div>
        </div>
        <div className = 'mt-4 flex flex-col items-start gap-2'>
        {errorMsg && <p>{errorMsg}</p>}
        <div className = 'flex gap-2'>
                  <button onClick = {formHandler} type = "submit" className = ' btn text-gray-800 dark:text-neutral-100 bg-neutral-50 dark:bg-gray-900'>Add</button>
        </div>
        </div>
      </div>
    </form>
    </motion.div>
                  <p className = 'text-neutral-100 text-xs my-4 sm:text-sm'>Click anywhere outside to close.</p>
  </motion.div>
}