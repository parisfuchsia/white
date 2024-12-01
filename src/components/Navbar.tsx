import Input from '../buttons/input';
import { GoSearch } from 'react-icons/go';
import { TbCategoryPlus } from "react-icons/tb";
import Sidebar from './sidebar/Sidebar.tsx';
import { useState } from 'react';

export default function Navbar({value, setQuery, onSubmit}){
  const [open, setOpen] = useState(false)
  
  return <div className = 'flex items-center gap-1'>
    {
      open && <Sidebar onClose = {() => setOpen(false)}/>
    }
        <button onClick = {() => setOpen(true)} className = 'flex items-center'><TbCategoryPlus className = 'size-8'/></button>
    <form onSubmit = {onSubmit} className = 'flex items-center gap-1'>
    <Input placeholder = 'Search products here...'value = {value} type = 'text' onChange = {(event) => setQuery(event.target.value)}/>
    <button type = 'submit' className = 'btn bg-gradient-to-r from-blue-300 to-violet-500 text-white font-bold' onClick = {onSubmit}><div className = 'flex items-center gap-2'><GoSearch className = 'text-white'/>Search</div></button>
    </form>
  </div>
}