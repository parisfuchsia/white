import { fetchCart, removeFromCart, Checkout } from '../state/slice';
import { useDispatch, useSelector as Select } from 'react-redux';
import Loading from '../components/Loading.tsx';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Cart(){
  const { cart } = Select(state => state.cart);
  const { loading } = Select(state => state.cart);
  const dispatch = useDispatch();
  const nav = useNavigate();
  let newCart = [];
 useEffect(() => {
    async function getCart(){
      await dispatch(fetchCart());
    }
    getCart();
  },[]);
  newCart = cart.filter(item => item.orderPlaced === false)
  
  const handleCheckout = async(getDetails) => {
    await dispatch(Checkout(getDetails))
    nav('/checkout');
  }
  
  
  const handleRemove = async(getData) => {
    await dispatch(removeFromCart({type: 'uuid', value: getData.uuid}));
          dispatch(fetchCart())
  }
  
  return <div className = 'w-full flex justify-center'>
    {
      loading ? <Loading /> : newCart.length > 0 ? <div className = 'w-full flex flex-col items-center'>
        {
          newCart.map((item) => {
            return <div key = {item.uuid} className = 'p-5 rounded-lg shadow-lg w-full flex flex-col items-start gap-2'>
              <div className = 'h-60 w-full'>
                <img src = {item.thumbnail} className = 'w-full h-full object-contain'/>
              </div>
              <div>
                <p>{item.title}</p>
                <p className = 'text-xs uppercase text-blue-400/80'>{item.brand || 'no brand'}</p>
                <p className = 'text-xs uppercase opacity-50'>Quantity: {item.quantity}</p>
                <p className = 'text-xs uppercase opacity-50'>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className = 'w-full flex justify-center items-center gap-2'>
                <button onClick = {() => handleRemove(item)} className = 'btn text-red-400'>Remove from cart</button>
                <NavLink to = {`/detail/${item.id}`} className = 'btn '>Details</NavLink>
                <button onClick = {() => handleCheckout(item)}className = 'btn bg-gradient-to-r from-blue-300 to-violet-500 font-bold text-white'>Checkout</button>
              </div>
            </div>
          })
        }
      </div> : <div className = 'flex flex-col items-center gap-2'><p className = 'opacity-50'>No products were added to your cart</p>
     <NavLink to = '/' className = 'btn bg-gradient-to-r from-blue-300 to-violet-500 text-white font-bold'>Go shopping</NavLink>
      </div>
    }
  </div>
}