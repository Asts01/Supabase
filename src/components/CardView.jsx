import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';


const CardView = ({existingData,searchVal}) => {

    // const selectedMailType='@gmail.com';
    const gmailType = useSelector((state) => state.user.mailType);
   

  return (
    <div>
      {existingData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {existingData
                .filter((item) => {
                    // If searchVal is empty, show all items, otherwise filter by name and email
                    return (
                    searchVal.toLowerCase() === '' ||
                    item.name.toLowerCase().includes(searchVal.toLowerCase())
                    ) && item.email.includes(gmailType);
                })
                .map((user, index) => (
                    <div key={index} className="bg-slate-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <p className="text-gray-700 font-semibold text-lg mb-2">ID: {user.id}</p>
                    <p className="text-purple-600 font-bold text-xl">{user.name}</p>
                    <p className="text-gray-600 mb-2">{user.email}</p>
                    <p className="text-gray-500 text-sm">{new Date(user.created_at).toLocaleString()}</p>
                    </div>
                ))
            }
          </div>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
    </div>
  )
}

export default CardView
