import { useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';

export default function Input({ placeholder, onChange, value, name, type}){
 const [typeHolder, setTypeHolder] = useState(type);
  
  const handleChange = () => {
    if(typeHolder === 'password'){
      setTypeHolder('text');
    }else{
      setTypeHolder('password');
    }
  }
  
  return <div className = {`w-full ${type === 'password' ? 'flex gap-4 items-center justify-center' : ''}`}><input
  className = {`p-2 rounded-lg w-11/12 shadow-lg focus:outline focus:outline-blue-700`}
  placeholder = {placeholder}
  onChange = {onChange}
  value = {value}
  name = {name}
  type = {typeHolder}
  />{
    type === 'password' ? <div className = 'size-8'onClick = {handleChange}>
      {
        typeHolder === 'password' ? <GoEyeClosed className = 'size-6'/> : <GoEye className = 'size-6 text-red-400'/>
      }
    </div> : null
  }
  </div>
}
