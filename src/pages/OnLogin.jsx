//on successfull login create entry in db with timeStamp
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

async function onStart(){
    const name = useSelector((state) => state.user.name);
    const email = useSelector((state) => state.user.email);
    try {
        const { data, error } = await supabase
          .from('users')
          .insert(
            {
              name: name,
              email: email,
            }
          );  
        
        if (error) {
          console.error('Error inserting user:', error);
        } else {
          console.log('User inserted successfully:', data);
        }
    } catch (e) {
        console.error('Error creating record in DB:', e);
    }
} 

function OnLogin() {

    useEffect(()=>{
        onStart();
    },[]);

  return (
    <div>
      
    </div>
  )
}

export default OnLogin
