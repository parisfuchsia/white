import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GoTag } from 'react-icons/go';
import { motion } from 'framer-motion';
import { CircleLoader } from 'react-spinners';
import { IoLogoFacebook } from "react-icons/io";

export default function details(){
  const [transactionDetail, setTransactionDetail] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { id } = useParams();
  
  useEffect(() => {
    setLoading(true);
   const items = JSON.parse(localStorage.getItem('transactions'));
   const detail = items.find(item => item.id === id);
   if(detail){
     setTransactionDetail(detail);
     setLoading(false);
   }
  }, [id]);
  
  const { type, amount, tags, desc, date, time } = transactionDetail;
  
  if(transactionDetail.length > 0){
    return <motion.div
    initial = {{opacity:0}}
    animate = {{opacity:1}}
    className = 'text-gray-800 dark:text-neutral-100'
    >
      No details retrieved
    </motion.div>
  }else if(!loading){
    return (
      <motion.div
      initial = {{opacity:0}}
    animate = {{opacity:1}}
    
      className = 'h-screen w-full'>
        <p className = 'ml-3 my-2 text-xs ml-5 text-gray-600 dark:text-gray-300'>Details</p>
        <div className = ' flex w-full flex-col items-start gap-2 p-5 bg-neutral-50 dark:text-neutral-100 dark:bg-gray-900 rounded-md shadow-md'>
          <div>
          <p className = 'text-2xl font-bold'>{type}</p>
          <p className = 'font-bold text-xl'>${amount}
         </p>
         </div>
          <div className = 'grid grid-cols-2 sm:grid-cols-4 gap-2 items-center'>
            {
            tags?.length > 0 ? tags?.map(tag =>  <div className = {`outline text-gray-800  py-1 px-2 rounded flex gap-1 items-center bg-teal-100 outline-teal-200`}>
             <GoTag /> {tag}
            </div>) : <p className = 'text-xs'>No tags</p>
          }</div>
          {
            desc?.length > 0 ? <div className  = 'flex flex-col gap-1'>
              <p className = 'text-xs text-gray-600 dark:text-gray-300 '>Description</p>
              <p text-gray-600 dark:text-gray-300  >{desc}</p>
            </div> : <p className = 'text-xs text-gray-600 dark:text-gray-300'>No description provided</p>
          }
                                  <p className = 'text-xs text-gray-600 dark:text-gray-300'>
              Date: {date} Time: {time}
            </p>
        </div>
        <div className = 'flex items-center gap-2 my-8 justify-center text-gray-600 dark:text-gray-300 text-xs'>
           <a href = "https://www.facebook.com/a.hopelieswithin?mibextid=ZbWKwL">
            <IoLogoFacebook className = 'size-10'/>
            </a>
          <div>
            <p>©Paris</p>
            <p>-A side project</p>
            </div>
        </div>
      </motion.div>
      )
  }else{
    return <div className = 'flex flex-col items-center gap-1 justify-center size-8 w-full'>
        <CircleLoader size = "40" color = "#5eead4" />
      </div>
  }
}