import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../client';

function Home() {
  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);

  const [existingData, setExistingData] = useState([]);

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

  useEffect(() => {
    if (name && email) {
      createRecord();
      fetchTable();
    }
  }, [name, email]);

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

      {/* Display user data in responsive tiles */}
      <div className="p-6">
        <h2 className="text-center text-xl mb-5">OnBoarded Users Till Date </h2>
        {existingData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {existingData.map((user, index) => (
              <div key={index} className="bg-slate-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <p className="text-gray-700 font-semibold text-lg mb-2">ID: {user.id}</p>
                <p className="text-purple-600 font-bold text-xl">{user.name}</p>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p className="text-gray-500 text-sm">{new Date(user.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
      <div className='fixed bottom-0 bg-slate-300 w-full justify-center items-center text-black text-center'>
        Only email and password should match for onBoarding the user ,userName could still vary
      </div>
    </div>
  );
}

export default Home;


