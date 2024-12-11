import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchHistoryList } from '../state/slice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, getTheme } from '../state/themeSlice.ts';
import Modal from './modal.tsx';
import Confirm from './confirm.tsx';
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";

export default function Banner(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { theme } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const nav = useNavigate();
  
  useEffect(() => {
    if(isModalOpen || isConfirmOpen){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "";
    }
  }, [isModalOpen, isConfirmOpen])
  
  
  
  const handleChangeTheme = (getValue) => {
    dispatch(changeTheme(getValue));
       localStorage.setItem('theme', getValue);
  }
  
  return <motion.div className = 'w-full flex items-center gap-2 overflow-x-hidden justify-between sm:p-8 p-5 my-5 rounded-lg z-20'>
         <AnimatePresence>
                   {
      isModalOpen && <Modal isOpen = {isModalOpen} onClose = {() => setIsModalOpen(false)}/>
                   }
       </AnimatePresence>
       <AnimatePresence>
         {
           isConfirmOpen && <Confirm onClose = {() => setIsConfirmOpen(false)}/>
         }
       </AnimatePresence>
    <NavLink to = '/' className = 'truncate act text-lg sm:text-2xl font-bold px-4 dark:text-neutral-100 tracking-wider italic'>Expense Tracker</NavLink>
    <div className = 'flex items-center text-xs sm:text-sm  gap-2 sm:gap-4 '>
      <p className = 'p-2 rounded-lg bg-gradient-to-tr from-blue-100 to-teal-200 text-gray-800 truncate' onClick = {() => setIsModalOpen(true)}>Add Transaction</p>
      <div >{
        theme === "light" ? <MdDarkMode onClick = {() => handleChangeTheme('dark')
        } className = 'text-teal-400' size = "18" /> : <MdOutlineDarkMode onClick = {() => handleChangeTheme('light')} className = 'text-teal-400'  size = "18"/>
      }</div>
            <p className = 'dark:text-neutral-100 underline flex items-center gap-1'onClick = {() => setIsConfirmOpen(true)} ><GrPowerReset className = 'text-gray-800 dark:text-neutral-100' />Reset</p>
    </div>
  </motion.div>
}