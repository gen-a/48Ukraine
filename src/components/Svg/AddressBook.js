import React from 'react';

const AddressBook = ({fill = '#000000', ...otherProps}) => (
  <svg viewBox="0 0 24 24" preserveAspectRatio="xMinYMin slice" {...otherProps}>
    <path
      fill={fill}
      d="M13,12H20V13.5H13M13,9.5H20V11H13M13,14.5H20V16H13M21,4H3A2,2 0 0,0 1,6V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V6A2,2 0 0,0 21,4M21,19H12V6H21"/>
  </svg>
);

export default AddressBook;
