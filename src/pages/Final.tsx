import { removeFromCart, fetchCart, setSuccess, updateCart } from '../state/slice';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector as Select} from 'react-redux';
import { useState } from 'react';
import Loading from '../components/Loading.tsx';

export default function Confirm({onClose, item}){
  const nav = useNavigate();
  const { cart } = Select(state => state.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const handleConfirm = async() => {
    setLoading(true);
   await dispatch(setSuccess(true));
   await dispatch(updateCart(item));
   await dispatch(fetchCart())
   setLoading(false);
   onClose()
  }
  
  return <div onClick = {onClose} className = 'bg-black/60 inset-0 flex justify-center items-center w-full fixed '>
    <div onClick = {(e) => e.stopPropagation() }className = 'p-5 bg-white rounded-lg w-10/12 flex flex-col items-center gap-5'>
      <div className = 'flex flex-col items-center text-xs gap-1 opacity-60'>
        <p>Note: This cannot be cancelled later.</p>
        <p>Click anywhere outside to close</p>
      </div>
      <p className = 'text-xl font-bold'>Confirm your order</p>
      <NavLink to = '/orderplaced' onClick = {handleConfirm} className = ' text-white font-bold btn bg-gradient-to-r from-blue-300 to-violet-500 flex items-center'>{loading ? <Loading size = '4px' color = 'white' /> : 'Confirm'}</NavLink>
    </div>
  </div>
}