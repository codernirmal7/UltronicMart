import { RootState } from '@/redux/index';
import React from 'react';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface UserInfoProps {
  isVisible: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({ isVisible }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const { userData , isLoggedIn } = auth;


  return (
    <div
    className={`fixed right-4 z-50 max-w-[14rem] w-full mt-2 p-4 flex-col bg-white border border-gray-300 rounded-lg shadow-lg transition-all duration-300 transform ${
      isVisible ? 'flex' : 'hidden'
    }`}

    >
      {
        isLoggedIn ? (
          <>
          {userData ? (
        <>
         <div>
         <p className='text-gray-400'>{userData.message?.email}</p>
         <div className='w-full h-[1px] bg-gray-400 mt-1'></div>
         <ul className='mt-3 flex flex-col gap-2'>
            <Link to="/user/payment-history" className='text-primary'>Payment History</Link>
            <Link to="/settings" className='text-primary'>Settings</Link>
            <button className='bg-primary/75 border-none text-white p-2 rounded-full hover:bg-primary mt-3'>Sign out</button>
         </ul>
         </div>
        </>
      ) : (
        <p>No user data available.</p>
      )}
          </>
        )
        : (
          <div>
            <Link to="/auth" className='text-primary'>sign in/sign up</Link>
          </div>
        )
      }
    </div>
  );
};

export default UserInfo;
