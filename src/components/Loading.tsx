import { BeatLoader } from 'react-spinners';

export default function Loading({color, size}){
  
  return <div className = 'w-full flex justify-center items-center my-5'>
    <BeatLoader size = {size || '8px'} color = {color || '#CCCCFF'}/>
  </div>
}