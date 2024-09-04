import React, { useState } from 'react';
import { SlArrowLeft } from "react-icons/sl";
import { MdNotificationsActive } from "react-icons/md";
import { Link } from 'react-router-dom'

export default function PasswordWithdraw() {

    const [formValues, setFormValues] = useState({
        'old password': "",
        'new password': "",
        'confirm password': "",
      });
    
    const [isFocused, setIsFocused] = useState({
        'old password': false,
        'new password': false,
        'confirm password': false,
    });

    const [allFieldsFilled, setAllFieldsFilled] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const handleFocus = (field) => {
        setIsFocused({ ...isFocused, [field]: true });
    };

    const handleBlur = (field) => {
        setIsFocused({ ...isFocused, [field]: false });
    };

    // Function to check if all fields are filled
    const checkAllFieldsFilled = () => {
        const allFilled = Object.values(formValues).every(value => value.trim() !== '');
        setAllFieldsFilled(allFilled);
    };

    return (
        <div className='flex flex-col items-center bg-white'>
            <div className='fixed left-0 top-0 w-full h-[55px] bg-[#DB2252] text-white flex justify-between items-center p-4 text-xl'>
                <Link to='/user'>
                    <SlArrowLeft className='cursor-pointer text-md' />
                </Link>
                <h1 className='text-[15px] md:t text-center font-medium'>MODIFY THE WITHDRAWAL PASSWORD</h1>
                <Link to='/notify'>
                    <MdNotificationsActive className='cursor-pointer' />
                </Link>
            </div>

            <h1 className='mt-[100px] text-xl pl-4 pr-4 md:text-2xl font-medium mb-10 text-center'>modify the withdrawal Password</h1>

            {['old password', 'new password', 'confirm password'].map(field => (
                <div className="mb-4 w-[95%] md:w-[350px] mt-2 relative" key={field}>
                    <label
                        className={`absolute left-5 transition-all ${
                            isFocused[field] || formValues[field] ? 'top-[-12px] text-md text-pink-500' : 'top-1/2 transform -translate-y-1/2 text-gray-500'
                            }`}
                        htmlFor={field}
                    >
                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                        id={field}
                        type={field === 'confirm password' ? 'password' : 'text'}
                        className={`border rounded-3xl h-[45px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        value={formValues[field]}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus(field)}
                        onBlur={() => { handleBlur(field); checkAllFieldsFilled(); }}
                    />
                </div>
            ))}

            <div className="flex items-center justify-center w-[330px]">
                <Link to='/user'>
                    <button
                        className={`bg-pink-600 w-[300px] sm:w-[350px] h-[50px] mt-3 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline ${!allFieldsFilled && 'opacity-50 cursor-not-allowed'}`}
                        type="button"
                        disabled={!allFieldsFilled}
                    >
                        NEXT
                    </button>
                </Link>
            </div>

            <p className='w-[90%] md:w-[350px] text-center mt-3 text-gray-400 text-[12.5px]'>Please remember your password. if forget your password, please contact customer service.</p>
        </div>
    )
}
