import * as React from 'react';
import ProfilePrrevTop from './ProfilePrrevTop';
import EditProfile from './EditProfile';
import Header from '../extras/Header'
const Profile = () => {
  return (
    <div className="flex justify-center flex-wrap h-screen w-ful " style={{backgroundColor:"rgb(238, 244, 253)",height:"900px"}}>
      <Header/>
      <header className="text-2xl w-full text-center font-bold text-3xl mt-20">My Profile</header>
      <ProfilePrrevTop />
      <EditProfile/>
    </div>
  )
};

export default Profile;
