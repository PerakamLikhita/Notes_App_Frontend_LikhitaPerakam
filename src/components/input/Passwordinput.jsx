import React, { useState } from 'react'
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa6";
const Passwordinput = ({value,onChange,placeholder}) => {
    const [isshowPassword, setIsShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setIsShowPassword(!isshowPassword);
    };
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
        <input
           
            value={value}
            onChange={onChange}
            type={isshowPassword ? "text" : "password"}
            placeholder="Password"
            className='w-full py-3 mr-3 text-sm bg-transparent outline-none'
        />
        {isshowPassword?<FaRegEye
            size={22}
            className="cursor-pointer text-primary"
            onClick={()=>togglePasswordVisibility()}
        />:<FaRegEyeSlash
            size={22}
            className='cursor-pointer text-slate-400'
            onClick={()=>togglePasswordVisibility()}
            />
        }
    </div>
  )
}

export default Passwordinput
