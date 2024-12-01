import { useDispatch, useSelector as Select } from 'react-redux';
import { useNavigate, NavLink} from 'react-router-dom';
import Loading from '../components/Loading.tsx';
import Confirm from '../pages/Final.tsx';
import { useState, useEffect } from 'react'; 
import { supabase } from '../supabaseClient.ts';

export default function Checkout(){
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const detail = Select(state => state.cart.checkoutDetail);
  const { loading } = Select(state => state.cart);
  
  const goBack = () => {
    nav(-1);
  }
  
  if(loading){
    return <Loading/>
  }
  
  return <div className = 'w-full flex justify-center'>
  {
    Object.keys(detail).length > 0 ? <div className = 'w-full flex justify-start rounded-lg shadow-lg p-5 pb-10'>
      {
        open && <Confirm item = {detail} onClose = {() => setOpen(false)}/>
      }
      <div className = 'flex flex-col items-center w-full gap-2'>
      <div className = 'h-52 w-full flex justify-center'>
        <img className = 'rounded-lg h-full w-full object-contain' src = {detail.thumbnail}/>
      </div>
      <div className = 'text-base w-full flex flex-col gap-2'>
        <div><p className = 'font-[times] text-xl'>{detail?.title}</p>
        <p className = 'text-xs uppercase text-blue-300'>{detail?.brand}</p>
        </div>
        <div>
          <p>{detail?.description}</p>
        </div>
        <p>Price: ${detail?.price}</p>
        <p>Qty: {detail?.quantity}</p>
        <p className = 'font-bold text-lg italic'>Total: ${(detail?.price * detail?.quantity).toFixed(2)}</p>
      </div>
        <div className = 'flex gap-4 items-center justify-end w-full mt-5'>
        <button onClick = {goBack} className = 'btn'>Cancel</button>
        <button onClick = {() => setOpen(true)}className = 'text-white font-bold btn bg-gradient-to-r from-blue-300 to-violet-500'>Place Order</button>
      </div>
      </div>
    </div> : <div className = ' flex flex-col items-center gap-2'>
      <p className = ' opacity-50'>No checkout in progress</p>
      <NavLink to = '/' className = 'text-white font-bold btn bg-gradient-to-r from-blue-300 to-violet-500'>Go shopping</NavLink>
    </div>
  }
  </div>
}