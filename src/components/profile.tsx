import React from 'react';
const UserProfile = () => {
  const user = {
    name: 'Sneha Pandey',
    email: 'pandeysneha953@gmail.com',
    age: 21,
    goal: 'Build lean muscle & stay active 💪',
    image: 'https://in.pinterest.com/pin/15481192462624170/',//just any image hehe
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10 text-center">
      <img
        src={user.image}
        alt="User"
        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-teal-500"
      />
      <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Age: {user.age}</p>
        <p className="text-sm text-gray-500">Goal: {user.goal}</p>
      </div>
    </div>
  );
};
export default UserProfile;
