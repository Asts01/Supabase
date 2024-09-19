import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../client';
import CardView from '../components/CardView';
import ListView from '../components/ListView';
import Filter from '../components/Filter';
import { setAuthStatusToTrue } from '../slice/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//BUG- Current email and password to udega hi(on refresh kyonki-redux me saved tha) db se jo data aa rha h aa jayega 
//CORRECTION- Local storage use krlo to save current user's email and name

function Home() {
  // const name = useSelector((state) => state.user.name);
  // const email = useSelector((state) => state.user.email);
  
  const authStatusRedux=useSelector((state)=>state.user.isAuthenticated);

  //FETCH CURRENT USER'S {name} AND {email} from LOCAL-STORAGE instead of react to save the state
  const items = JSON.parse(localStorage.getItem('details'));
  const authStatus=JSON.parse(localStorage.getItem('authStatus'))
  // const dipatch=useDispatch();
  const name=items.name;
  const email=items.email;
  const navigate=useNavigate();
  const dispatch=useDispatch();


  const [existingData, setExistingData] = useState([]);

  const [isCardView,setIsCardView]=useState(true);

  const [searchVal,setSearchVal]=useState("");

  const [filterComponent,setFilterComponent]=useState(false);


  async function createRecord() {

    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          name: name,
          email: email,
        });
      
      
      if (error) {
        console.error('Error inserting user:', error);
      } else {
        console.log('User inserted successfully:', data);
      }
    } catch (e) {
      console.error('Error creating record in DB:', e);
    }
  }

  async function fetchTable() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select();
      
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setExistingData(data);
      }
    } catch (e) {
      console.error('Error fetching data from DB:', e);
    }
  }

  function fetchDetailsAgain(){
    //update the current name and email from redux store on re-loading of the page !!
    name=useSelector((state)=>state.name);
    email=useSelector((state)=>state.email);
    fetchTable();
  }

  useEffect(() => {
    if(authStatusRedux===false)
    {
      navigate('/login');
    }
    if (name && email) {
      createRecord();
      
    }else{
      
    }
    fetchTable();
  }, [name, email]);

  // const dispatch=useDispatch();
  //user can only go back if loggedOut once
  const onLogoutFun=()=>{
    dispatch(setAuthStatusToTrue(false));
    setFilterComponent(!filterComponent);
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100 absolute ">
      <h1 className="flex justify-center items-center bg-slate-300 p-5 mb-5 text-2xl">HomePage 🏠</h1>
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="text-xl mb-2">
          Congratulations <span className="text-purple-600">{name}</span> on being OnBoarded!!!
        </h2>
        <p className="text-lg">
          Email Id: <span className="text-purple-600">{email}</span>
        </p>
      </div>
      <div className='relative'>

        {!isCardView?
          (<button className='bg-slate-500 text-white rounded-md p-1 m-2' onClick={()=>setIsCardView(!isCardView)}>List-View</button>):
          <button className='bg-slate-500 text-white rounded-md p-1 m-2' onClick={()=>setIsCardView(!isCardView)}>Card-View</button>
        }
        <input placeholder='search for name' className='bg-slate-300 p-1 rounded-md' type='search' val={searchVal} onChange={(e)=>setSearchVal(e.target.value)}></input>
        <button className='p-1 bg-slate-700 text-white rounded-lg m-2' onClick={()=>setFilterComponent(!filterComponent)}>Filter </button>
        <button className='p-1 bg-slate-700 text-white rounded-lg m-2 absolute right-0' onClick={()=>onLogoutFun()}>LogOut </button>
      </div>
      
        {filterComponent?(<div>{<Filter/>}</div>):(<div></div>)}

      {/* Display user data in responsive tiles */}
      <div className="p-6">
        <h2 className="text-center text-xl mb-5">OnBoarded Users Till Date </h2>
        {!isCardView?(<ListView existingData={existingData}  searchVal={searchVal} />):(<CardView existingData={existingData} searchVal={searchVal} />)}
      </div>
      <div className='fixed bottom-0 bg-violet-400 text-white w-full justify-center items-center text-black text-center'>
        Only email and password should match for onBoarding the user ,userName could still vary
      </div>
    </div>
  );
}

export default Home;


