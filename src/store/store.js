import { configureStore } from '@reduxjs/toolkit'
// import TaskSlice from '../slices/taskSlice'
import UserSlice from '../slice/userSlice';

const store =  configureStore({
  reducer: {
    // task:TaskSlice,
    user:UserSlice,
  },
})

export default store;