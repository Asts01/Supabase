import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setMailType } from '../slice/userSlice';

const MailType = ({closeMailTypeModal}) => {
    //just trigger this closeMailTypeModal on cross button being pressed !!

    const [selected,setSelected]=useState(false);
    const dispatch=useDispatch();

    //initially only one mail filter can be applied
    function setMailTypeInRedux(mailType) {
        // console.log("chala h kya ???");
        dispatch(setMailType(""));
        dispatch(setMailType(mailType));
    }

    function onApply(){
        closeMailTypeModal();
    }


    //we want to acheive the functionality that only one checkbox can be checked at a time and if one mail-type
    //is selected results corresponding to that only needs to be shown on the home screen

  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-1 flex justify-center items-center"
    >
        <div className="bg-white p-5 rounded-lg relative z-60 w-1/2">
        <button 
          onClick={closeMailTypeModal} 
          className="absolute top-2 right-2 text-xl font-bold"
        >
          &times;
        </button>
        {/* entire styling of modal-component goes here */}
        <div className="flex flex-col gap-5 ">
        <div className='flex-col flex gap-2'>
          <h2 className='mb-3'>Select Mail-Type : </h2>
          <label className="block">
            <input type="radio" className="mr-2" name='ekHiSelectHoEkBaarMe' onClick={()=>setMailTypeInRedux('@gmail.com')}/>
            @gmail.com
          </label>
          <label className="block">
            <input type="radio" className="mr-2" name='ekHiSelectHoEkBaarMe' onClick={()=>setMailTypeInRedux('@mail.com')}/>
            @mail.com
          </label>
          <label className="block">
            <input type="radio" className="mr-2" name='ekHiSelectHoEkBaarMe' onClick={()=>setMailTypeInRedux('@yahoo.com')}/>
            @yahoo.com
          </label>
          <label className="block">
            <input type="radio" className="mr-2" name='ekHiSelectHoEkBaarMe' onClick={()=>setMailTypeInRedux('@ietdavv.edu.in')}/>
            @ietdavv.edu.in
          </label>
        </div>
        <div className='w-full flex items-center justify-center'>

          <button className='bg-blue-600 text-white p-1 rounded-md inline-block w-1/2' onClick={()=>onApply()}>Apply</button>
        </div>

        </div>
      
        
      </div>
    </div>
  )
}

export default MailType
