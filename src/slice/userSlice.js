import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
      name:'',
        email:'',
        mailType:'',
    },
    reducers: {
        //update user on getting onBoarded
        //same as 
        updateUser:(state,action)=>{
            state.name=action.payload.name;
            state.email=action.payload.email;
            localStorage.setItem('details', JSON.stringify({'name':state.name,'email':state.email}));
        },
        setMailType:(state,action)=>{
          // console.log("currentMailType",action.payload);
          state.mailType=action.payload;
          // console.log("currentMailType",action.payload);
        }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { updateUser,setMailType} = UserSlice.actions
  
  export default UserSlice.reducer