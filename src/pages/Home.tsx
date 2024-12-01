import { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BeatLoader } from 'react-spinners';
import Loading from '../components/Loading.tsx'
;
import { fetchProducts, searchProducts, setSuccess, Reset } from '../state/slice.ts';
import { useDispatch, useSelector as Select } from 'react-redux';

export default function Home(){
  const { products } = Select(state => state.cart)
  const [skip, setSkip] = useState(1);
  const { loading } = Select(state => state.cart);
  const [query, setQuery] = useState('');
  const [pages, setPages] = useState(19);
  const dispatch = useDispatch();
  const { byDefault } = Select(state => state.cart)
  
  useEffect(() => {
  
      dispatch(setSuccess(false));
      dispatch(Reset())
  },[])
  
  const search = async(e) => {
    e.preventDefault();
    if(!query.length){
      return
    }else{
      dispatch(searchProducts(query.toLowerCase().trim()));
      setQuery('');
    }
  }
  
  useEffect(() => {
    dispatch(fetchProducts(skip));
  },[skip])
  
  return <div className = 'mx-auto w-full flex flex-col items-center'>
         <Navbar value = {query} onSubmit = {search} setQuery = {setQuery}/>
         
   <div className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full xl:grid-cols-4 2xl:grid-cols-5 '>
     {
      loading ? <Loading /> : products?.products?.length > 0 ? products?.products?.map((item, i) => {
         return <NavLink to = {`/detail/${item.id}`} key = {item?.id} className = ' w-full min-h-[390px] p-5 rounded-xl shadow-xl flex flex-col items-center gap-4 active:opacity-50'>
           <div className = 'size-60'>
           <img className = 'w-full h-full rounded-xl  object-cover' src = {item?.thumbnail}/>
           </div>
           <div className = 'w-full text-left flex flex-col justify-start gap-2 items-start'>
           <p className = 'font-[times] w-full text-xl truncate'>{item?.title}</p>
           <p className = 'text-xs uppercase text-blue-400/80'>{item?.brand || 'No brand'}</p>
          <div className = 'flex items-center gap-3'>
            <p className = 'text-xl italic'>${item?.price}</p>
            <p className = 'uppercase text-xs opacity-80'>Stock: {item?.stock}</p>
          </div>
           </div>
           </NavLink>
       }) : !loading && <p className = 'text-center flex flex-col items-center w-full my-4 opacity-50'>No products found</p>
     }
   </div> 
     
   {!loading && byDefault && <div className = 'w-full flex justify-center items-center my-2 gap-2'>
     <MdKeyboardArrowLeft className = 'size-8' onClick = {() => setSkip(skip === 1 ? 19 : skip - 1)}/>
     <p>{skip}/{pages}</p>
     <MdKeyboardArrowRight className = 'size-8' onClick = {() => setSkip(skip === 19 ? 1 : skip + 1)}/>
   </div> 
   }
  </div>
}