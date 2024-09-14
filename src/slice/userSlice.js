import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';


export const UserSlice = createSlice({
    name: 'user',
    initialState: {
      name:'',
        email:'',
    },
    reducers: {
        //update user on getting onBoarded
        //same as 
        updateUser:(state,action)=>{
            state.name=action.payload.name;
            state.email=action.payload.email;
        }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { updateUser} = UserSlice.actions
  
  export default UserSlice.reducer