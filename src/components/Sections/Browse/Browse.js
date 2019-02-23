import React from 'react';
import { connect } from 'react-redux';
import { setDepartment } from '../../../actions/app';

const Browse = ({match:{params:{department}}, setDepartment}) => {
  console.log(setDepartment);
  setDepartment(department);
  return  (<div>Browse {department}</div>);
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDepartment: (id) => {dispatch(setDepartment(id))},
  }
};

export default connect(null, mapDispatchToProps)(Browse);
