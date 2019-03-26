import React from 'react';
import UserProfile from '../../../components/Forms/UserProfile';
import PageTitle from '../../../components/PageTitle';

const Profile = () => {
  return (
    <>
    <PageTitle
      title="Your Profile"
    />
      <UserProfile />
    </>
  )
};

export default Profile;
