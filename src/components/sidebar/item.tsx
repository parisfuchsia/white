import List from './list'
import { useState } from 'react';
import { getProductsByCategory } from '../../state/slice'
import { useDispatch } from 'react-redux';
import { IoIosArrowDown, IoIosArrowForward} from "react-icons/io";

export default function Item({item}){
  const [category, setCategory] = useState({});
  ;
  const dispatch = useDispatch();
  
  const handleToggle = () => {
    setCategory((prev) => {
      return {
        ...prev, [item.title]: !category[item.title]
      }
    })
  }
  
  const handleFetch = async() => {
    await dispatch(getProductsByCategory(item.categoryKey))
  }
  
  return <div>
    <p className = {`
    ${item?.children?.length > 0 ? 'flex items-center gap-1 text-lg  ' : 'ml-10 p-1 rounded-sm active:opacity-50 shadow-sm'}
    `} onClick = {item?.children?.length > 0 ? handleToggle : handleFetch}>{item?.children?.length > 0 && category[item.title] ? <IoIosArrowDown/> : item?.children?.length > 0 && <IoIosArrowForward/>}{item?.title}</p>
    <ul>
    {
      category[item.title] && item?.children?.length > 0 && <li><List list = {item.children}/></li>
    }
    </ul>
  </div>
}