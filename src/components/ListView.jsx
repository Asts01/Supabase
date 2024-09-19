import React from 'react';

const ListView = ({ existingData, searchVal }) => {
  return (
    <div className="bg-slate-300 p-4">
      {existingData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-700 font-bold">
              <tr>
                <th className="py-3 px-4 border-b">ID</th>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {existingData
                .filter((item) => searchVal.toLowerCase() === '' || item.name.toLowerCase().includes(searchVal.toLowerCase()))
                .map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border-b">{user.id}</td>
                    <td className="py-3 px-4 border-b">{user.name}</td>
                    <td className="py-3 px-4 border-b">{user.email}</td>
                    <td className="py-3 px-4 border-b">{new Date(user.created_at).toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default ListView;
