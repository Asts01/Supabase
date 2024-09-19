import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
      name:'',
        email:'',
        mailType:'',
        isAuthenticated:false,//for maintaining state in redux
    },
    reducers: {
        //update user on getting onBoarded
        //same as 
        updateUser:(state,action)=>{
            state.name=action.payload.name;
            state.email=action.payload.email;
            //on adding authStatus to localStorage we still stay on home-screen on beeing refreshed
            //otherwise user details get erased and we are directed to home-screen
            localStorage.setItem('details', JSON.stringify({'name':state.name,'email':state.email}));
            localStorage.setItem('authStatus', JSON.stringify({'isAuthenticated':false}));
        },
        setMailType:(state,action)=>{
          // console.log("currentMailType",action.payload);
          state.mailType=action.payload;
          // console.log("currentMailType",action.payload);
        },
        setAuthStatusToTrue:(state,action)=>{
          state.isAuthenticated=action.payload;
          localStorage.setItem('authStatus', JSON.stringify({'isAuthenticated':true}));
        },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { updateUser,setMailType,setAuthStatusToTrue} = UserSlice.actions
  
  export default UserSlice.reducer