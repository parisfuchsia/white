import { useParams } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Button from '../buttons/button';
import Loading from '../components/Loading.tsx';
import Modal from '../components/Modal.tsx';

export default function Detail(){
  const {id} = useParams();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  //LAZY COMPONENTS
  
  //

const handleEffect = (e) => {
  setType(e.target.name);
  setOpen(true);
  console.log(e.target.name);
}


  
  useEffect(() => {
   const fetchDetail = async() => {
     setLoading(true);
     try{
       const respo = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await respo.json();
      console.log(data);
      setDetail(data);
      setLoading(false);
     }catch(e){
       alert(e);
     }
    }
    fetchDetail();
  },[id]);
  
  return <div className = 'z-1'>
    {
      open && <Modal type = {type} item = {detail} open = {open} onClose = {() => setOpen(false)}/>
    }
    {
     loading ? <Loading/> : Object.keys(detail).length > 0 && <div >
       <div className = 'h-86'>
         <img className = 'w-full h-full rounded-xl object-cover shadow-lg'src = {detail?.thumbnail}/>
       </div>
       <div className = ' my-2 flex flex-col items-start gap-6'>
        <div>
         <p className = ' font-[times] w-full text-xl truncate'>{detail.title}</p>
         <p className = 'text-xs uppercase text-blue-400/80'>{detail.brand || 'No brand'}</p>
        </div>
         <p>{detail.description}</p>
         <div className = 'flex gap-3 items-center'>
           <p className = 'text-xl italic'>${detail.price}</p>
           <p className = 'text-xs uppercase z-0 opacity-80'>Stock:{detail.stock}</p>
         </div>
         <div className = 'flex items-center gap-2'>
           <button name = 'addtocart' onClick = {handleEffect} className = 'bg-gradient-to-r from-blue-300 to-violet-500 btn text-gray-700 text-white font-bold'>Add To Cart</button>
           <button name = 'checkout' className = 'btn bg-gradient-to-r from-blue-300 to-violet-500 text-white font-bold' onClick = {handleEffect}>Checkout</button>
         </div>
       </div>
      </div>
    }
  </div>
  
}