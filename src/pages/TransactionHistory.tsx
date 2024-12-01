import { fetchCart, removeFromCart } from '../state/slice';
import { useDispatch, useSelector as Select } from 'react-redux';
import { supabase } from '../supabaseClient.ts';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading.tsx';
import { NavLink } from 'react-router-dom';

export default function History(){
  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cart } = Select(state => state.cart);
  
  
  async function getPlacedOrder(){
    setLoading(true);
    try{
      const { data } = await supabase
      .from('cart')
      .select('*')
      .eq('orderPlaced', true);
      if(data){
        setTransaction(data);
        setLoading(false);
      }
    }catch(e){
      alert(e);
    }
  }
  
  useEffect(() => {
    getPlacedOrder();
  },[])
  
  
  
  const clearAll = async () => {
   await supabase
   .from('cart')
   .delete()
   .eq('orderPlaced', true);
   getPlacedOrder();
  }
  
  const remove = async(getUUID) => {
    await dispatch(removeFromCart({type: 'uuid', value: getUUID}));
    getPlacedOrder();
  }
  
  if(loading){
    return <Loading />
  }
  
  if(transaction.length === 0){
    return <div className = 'flex flex-col items-center gap-2'>
      <p className = 'opacity-50'>No records of transaction.</p>
      <NavLink to = '/' className = 'btn bg-gradient-to-r from-blue-300 to-violet-500 text-white font-bold'>Go shopping</NavLink>
    </div>
  }
  
  return <div className = 'flex flex-col items-center gap-1 w-full'>
    <div className = 'grid grid-cols-12 grid-rows-1 items-center gap-1 text-xs italic'>
      <p className = 'col-span-3 h-full flex items-center p-2 justify-center border-[1px] rounded border-gray-800'>Product</p>
      <p className = 'col-span-3 h-full flex items-center p-2 justify-center border-[1px] border-gray-800 rounded'>Qty*Price</p>
      <p className = 'col-span-3 h-full flex items-center p-2 justify-center border-[1px] border-gray-800 rounded'>Total</p>
      <p className = 'col-span-3 h-full flex items-center p-2 justify-center border-[1px] border-gray-800 rounded'>Added to cart/Order placed</p>
    </div>
    {
      transaction.length > 0 && transaction.slice().reverse().map(item => {
        return <div key = {item.uuid} className = 'grid grid-cols-12 text-xs gap-2 w-full p-5 border-[1px] border-gray-700 rounded'>
          <p className = 'col-span-3 text-left'>{item.title}</p>
          <p className = 'col-span-3 text-center'>{item.quantity}*${item.price}</p>
          <p className = 'col-span-3 text-center'>${(item.quantity * item.price).toFixed(2)}</p>
          <p className = 'col-span-3 text-right'>{item.created_at.split('T')[0]}</p>
         <div className = 'col-span-12 flex justify-end'><button className = 'text-red-400 btn' onClick = {() => remove(item.uuid)}>Remove</button></div>
        </div>
      })
    }
        { transaction.length > 1 && <p onClick = {clearAll} className = ' text-red-400 w-full text-center btn my-2'>Clear all</p>}
  </div>
}