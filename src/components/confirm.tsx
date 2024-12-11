
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoAlert } from 'react-icons/go';

export default function Confirm({onClose}) {
  
  const nav = useNavigate();
  
  const handleClick = () => {
    localStorage.setItem('transactions', JSON.stringify([]));
    onClose()
    nav('/');
    window.location.reload();
  }
  
  return (
    <motion.div
    initial = {{ opacity:0 }}
  animate = {{ opacity:1 }}
  exit = {{ opacity:0 }}
  onClick = {onClose}
    className = 'bg-[#00000090] z-40 fixed inset-0 flex justify-center flex-col items-center'>
      <div onClick = {(e) => e.stopPropagation()}className = 'p-5 rounded-lg bg-neutral-100 dark:bg-gray-800 flex flex-col gap-6 w-11/12 sm:w-8/12'>

        <div className = 'flex flex-col gap-4'>
                  <p className = 'text-gray-800 dark:text-neutral-100 text-xs'>Reset data</p>
        <p className = 'text-2xl font-bold text-gray-800 dark:text-neutral-100'>Are you sure?</p>
        <p className = 'text-gray-800 dark:text-neutral-100'>This will remove all the data stored in your browser's local storage.</p>
        <p className = ' flex items-center gap-1 text-gray-800 dark:text-neutral-100 text-xs'><GoAlert />This action cannot be undone</p>
        </div>
        <button className = 'btn bg-neutral-50 dark:bg-gray-900 text-gray-800 dark:text-neutral-100'onClick = {handleClick}>Confirm</button>
      </div>
      <p className = 'text-neutral-100 sm:text-sm text-xs my-4 '>Click anywhere outside to close.</p>
    </motion.div>
  )
}