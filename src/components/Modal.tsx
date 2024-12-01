import { useState } from 'react';
import { CiCircleAlert } from "react-icons/ci";
import { useDispatch, useSelector as Select} from 'react-redux';
import { addToCart, Checkout, fetchCart, updateCart } from '../state/slice';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading.tsx';

export default function Modal({onClose, item, type}){
  const [qty, setQty] = useState(1);
  const { checkoutDetail } = Select(state => state.cart);
  const [loading, setLoading] = useState(false);
  //
  const dispatch = useDispatch();
  const nav = useNavigate();
  //
  
  const handleCheckout = async() => {
    setLoading(true);
   await dispatch(Checkout({...item, quantity: qty}));
   await dispatch(addToCart({...item, quantity: qty, orderPlaced: true} ));
   setLoading(false);
   onClose();
   nav('/checkout')
  }
  
  const handleAddToCart = async() => {
   await dispatch(addToCart({...item, quantity: qty}));
    onClose();
  }
  
  return <div className = {`fixed bg-black/60 inset-0 flex items-center z-10 justify-center ${open ? 'visible' : ' hidden'}`} onClick = {onClose}>
    <div onClick = {(e) => e.stopPropagation()}className = 'bg-white rounded-lg w-9/12 p-5 flex flex-col items-center gap-2'>
      <p className = 'text-xs opacity-50 uppercase'>{type === 'checkout' ? 'Checkout' : 'Add to cart'}</p>
      <div>
      <p className = 'text-xs opacity-70 mt-4 flex items-center gap-1'><CiCircleAlert/>10 items/Stock is the max quantity available.</p>
      <p className = 'text-xs opacity-70 flex items-center gap-1'><CiCircleAlert className = 'invisible'/>Click outside to close/discard.</p>
      </div>
      <p>Quantity</p>
      <div className = 'flex items-center gap-4 justify-center'>
        <span onClick = {qty === 1 ? null : () => setQty(prev => prev - 1)} className = 'text-2xl '>{`<`}</span>
        <p className = 'btn text-center '>{qty}</p>
        <span onClick = {qty === item.stock || qty === 10 ? null : () =>  setQty(prev => prev + 1)} className = 'text-2xl '>{`>`}</span>
      </div>
              <div className = 'text-xs uppercase flex items-center gap-5'>
                <p>Stock: {item.stock}</p>
         <p>Total: ${(item.price * qty).toFixed(2)}</p>
        </div>
      <div className = 'flex justify-center w-full'>
        <button onClick = {type === 'addtocart' ? handleAddToCart : handleCheckout} className = 'btn  bg-gradient-to-r from-blue-300 to-violet-500 text-white font-bold text-white font-bold mb-4 overflow-hidden flex items-center'>{loading ? <Loading size = '4px' color = 'white'/> : type === 'checkout' ? 'Checkout' : 'Add to cart'}</button>
      </div>
    </div>
  </div>
}