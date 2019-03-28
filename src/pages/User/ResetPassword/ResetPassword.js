import React from 'react';
import UserPassword from '../../../components/Forms/UserPassword';
import PageTitle from '../../../components/PageTitle';

const ResetPassword = () => {
  return (
    <>
    <PageTitle
      title="Змінити пароль"
    />
      <UserPassword/>
    </>
  )
};

export default ResetPassword;
