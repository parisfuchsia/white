
import { motion } from 'framer-motion';
import { GoTag } from 'react-icons/go';
import { useState } from 'react';
import { fetchByFilter, removeFilter } from '../state/slice.ts';
import { useDispatch, useSelector } from 'react-redux';

export default function filterModal({onClose}) {
  
  

const tags = ["Food", "Travel", "Groceries","Salary","Others"];
 const [selected, setSelected] = useState({});
 const [dataFormat, setDataFormat] = useState({
   type:"Income",
   tags:[]
 });
 const dispatch = useDispatch();
 const { filteredTransactions } = useSelector(state => state.transac);
 
  const handleClick = (getLabel) => {
    let cpyDataFormat = {...dataFormat};
      setSelected({...selected, [getLabel]: !selected[getLabel]});
      if(cpyDataFormat.tags.includes(getLabel)){
        const tagIndex = cpyDataFormat.tags.indexOf(getLabel);
        cpyDataFormat.tags.splice(tagIndex, 1);
      }else{
        cpyDataFormat.tags.push(getLabel);
      }
      setDataFormat(cpyDataFormat);
  }
  
  const formHandler = async(getCall) => {
    if(getCall === 'filter'){
   await dispatch(fetchByFilter({type: dataFormat.type, tags: dataFormat.tags}));
    }else{
      await dispatch(removeFilter());
    }
   onClose()
  }
  
  
  return (
    <motion.div
    onClick = {onClose}
    initial = {{ opacity:0 }}
  animate = {{ opacity:1 }}
  exit = {{ opacity:0 }}
  className = 'bg-[#00000090]  flex-col inset-0 fixed flex items-center justify-center'
    >
      <motion.div
      initial = {{ opacity:0 }}
  animate = {{ opacity:1 }}
  exit = {{ opacity:0 }}
    onClick = {(e) => e.stopPropagation()}className = 'bg-neutral-50 dark:bg-gray-800 z-20 flex w-11/12 sm:w-8/12  flex-col gap-4 p-8 shadow-md rounded-lg justify-center items-start'
      >
        <p className = 'w-full text-center text-gray-600 dark:text-gray-300  text-xs'>Filter </p>
        <div className = 'flex flex-col gap-1'>
        <label className = 'text-xs text-gray-600 dark:text-gray-300 '>Type</label>
        <select onChange = {(e) => setDataFormat(prev => {
          return {
            ...prev, type: e.target.value
          }
        })} className = 'p-2 bg-neutral-50 dark:bg-gray-800 '>
          <option value = "Income" >Income</option>
          <option value = "Savings" >Savings</option>
          <option value = "Expenses" >Expenses</option>
        </select>
        </div>
        <div className = 'flex flex-col gap-2'>
        <label className = 'text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1'><GoTag />Tags</label>
        <div className = 'grid grid-cols-3 sm:grid-cols-4 gap-2 '>
        {
          tags.map(tag => {
            return <div key = {tag} onClick = {() => handleClick(tag)} className = {`outline  py-1 px-2 rounded text-gray-800 text-center ${
           !selected[tag] ? 'bg-white outline-teal-100' : 'bg-teal-100 outline-teal-200'
         } `}>
              {tag}
            </div>
          })
        }
        </div>
        </div>
        <div className = 'flex gap-1 '>
                <button className = 'btn bg-neutral-50 dark:bg-gray-900' onClick = {formHandler}>Show All</button>
        <button onClick = {() => formHandler('filter')} className = 'btn bg-neutral-50 dark:bg-gray-900'>Filter</button>
        </div>
      </motion.div>
                    <p className = 'text-neutral-100 text-xs my-4 sm:text-sm'>Click anywhere outside to close.</p>
    </motion.div>
  )
}