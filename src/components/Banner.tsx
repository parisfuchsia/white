import { NavLink } from 'react-router-dom';
import { CiShoppingCart, CiHome } from "react-icons/ci";
import { GoHistory } from "react-icons/go";
import fuchsia from '../../fuchsia.svg';

export default function Banner(){
  return <div className = 'w-[100vw] flex absolute top-0 justify-around items-center h-[70px] bg-white text-gray-700 shadow-md '>
    <div className = 'flex gap-2 items-center'>
      <div className = 'size-10'>
    <img className = 'h-full w-full object-cover' src = {fuchsia} />
    </div>
    <NavLink to = '/' className = 'text-3xl font-[times] font-medium italic text-gray-800'>Fuchsia</NavLink>
    </div>
    <div className = 'flex items-center underline gap-4'>
      <NavLink className = 'flex items-center ' to = '/'><CiHome className = 'size-5' />Home</NavLink>
      <NavLink className = 'flex items-center' to = '/cart'><CiShoppingCart className = 'size-5'/>Cart</NavLink>
      <NavLink  className = 'flex items-center' to = '/history'><GoHistory className = 'size-5'/>History</NavLink>
    </div>
  </div>
}