import React from 'react';
import { useSelector } from 'react-redux';

const ListView = ({existingData,searchVal}) => {
  return (
    <div className="bg-slate-300 ">
      {existingData.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">ID</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">Name</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">Email</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold">Created At</th>
            </tr>
          </thead>
          <tbody>
          {existingData.filter((item)=>{return searchVal.toLowerCase()===''?item:item.name.toLowerCase().includes(searchVal)}).map((user, index) => (
              <div key={index} className="bg-slate-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <p className="text-gray-700 font-semibold text-lg mb-2">ID: {user.id}</p>
                <p className="text-purple-600 font-bold text-xl">{user.name}</p>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p className="text-gray-500 text-sm">{new Date(user.created_at).toLocaleString()}</p>
              </div>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default ListView;
