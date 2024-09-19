import {React,useState} from 'react'
import MailType from './MailType';

const Filter = () => {
  const [mailTypeModal,setMailTypeModal]=useState(false);//to show mailTypeModal or-not

  function toggleMailTypeModal() {
    setMailTypeModal(!mailTypeModal);  
  }
  return (
    <div className='flex bg-slate-300 p-2 m-2'>
      <button onClick={()=>setMailTypeModal(!mailTypeModal)}>MailType ▼</button>
      <h2 className='px-5'>Add Date Filter 🗓️</h2>
      <h2>Add Time Filter ⏱️</h2>
      {
        mailTypeModal&&(
            <MailType closeMailTypeModal={toggleMailTypeModal}/>
        )
      }
    </div>
  )
}

export default Filter
