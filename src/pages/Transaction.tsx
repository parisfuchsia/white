
import Loading from '../components/Loading.tsx';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector as Select, dispatch } from 'react-redux';
import { setSuccess, Reset } from '../state/slice';
import { GoHeart } from 'react-icons/go'
import { supabase } from '../supabaseClient.ts';

export default function Transaction(){
  const nav = useNavigate();
  const { success } = Select(state => state.cart);
  const { loading } = Select(state => state.cart);
  const detail = Select(state => state.cart.checkoutDetail);
  
  if(!success){
    return <div className = 'opacity-50 w-full text-center'>
      No current records of placed order in this session.
      <p className = 'text-xs font-bold'>Check your Transaction History</p>
    </div>
  }
  
  if(loading){
    return <Loading/>
  }
  
  
  return <div>
    {Object.keys(detail)?.length > 0 && <div className = 'relative inset-0 flex justify-center items-center flex-col '>
    <div className = 'bg-white rounded-xl shadow-lg w-full flex flex-col justify-center items-center gap-2 p-5'>
      <p className = 'text-xs opacity-60'>Transaction successful</p>
      <p className = 'text-xl'>Thank you for purchasing!</p>
      <p className = 'text-center text-xs opacity-60'>Your order of <span className = 'font-bold text-blue-600'>{detail?.title}</span> was successfully placed, and soon to be shipped.
     <span className = 'block'>Shipping delivery usually takes upto 2-3 days.</span> 
      </p>
      <NavLink to = '/' className = 'btn bg-gradient-to-r from-blue-300 to-violet-500 text-white font-bold'>
        Shop again
      </NavLink>
    </div>
    <div className = 'my-10 flex items-center gap-2 opacity-50'>
     Made with <GoHeart className = 'text-violet-400 size-5'/>by Paris
    </div>
  </div>
  }
  </div>
}