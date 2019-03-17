import React from 'react';
import UserPassword from '../../../components/Forms/UserPassword';

const ResetPassword = ({ callHideLoader }) => {
  setTimeout(() => callHideLoader(), 0);
  return (
    <>
      <h1>Reset Password</h1>
      <UserPassword/>
    </>
  )
};

export default ResetPassword;
