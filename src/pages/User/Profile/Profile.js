import React from 'react';
import UserProfile from '../../../components/Forms/UserProfile';

const Profile = ({ callHideLoader }) => {
  setTimeout(() => callHideLoader(), 0);
  return (
    <>
      <h1>Your Profile</h1>
      <UserProfile/>
    </>
  )
};

export default Profile;
