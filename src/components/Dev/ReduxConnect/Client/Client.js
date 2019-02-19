import React from 'react';
import logProps from '../../hoc/logProps';


const Client = ({ own, title }) => (
  <>
    <div>{title}</div>
    <div>{own}</div>
  </>
);

export default logProps(Client);