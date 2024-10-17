import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
      name:'',
        email:'',
        mailType:'',
        isAuthenticated:false,//for maintaining logged-in-active-state in redux
    },
    reducers: {
        //update user on getting onBoarded
        updateUser:(state,action)=>{
            state.name=action.payload.name;
            state.email=action.payload.email;
            //on adding authStatus to localStorage we still stay on home-screen on beeing refreshed
            //otherwise user details get erased and we are directed to home-screen
            localStorage.setItem('details', JSON.stringify({'name':state.name,'email':state.email}));
            //equivalent to isAuthenticated in redux
            localStorage.setItem('authStatus', JSON.stringify({'isAuthenticated':false}));
        },
        setMailType:(state,action)=>{
          // console.log("currentMailType",action.payload);
          state.mailType=action.payload;
          // console.log("currentMailType",action.payload);
        },
        setAuthStatusToTrue:(state,action)=>{
          state.isAuthenticated=action.payload;
          localStorage.setItem('authStatus', JSON.stringify({'isAuthenticated':action.payload}));
        },
    },
  })

  export const { updateUser,setMailType,setAuthStatusToTrue} = UserSlice.actions
  
  export default UserSlice.reducer