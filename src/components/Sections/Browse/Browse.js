import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDepartment } from '../../../actions/app';

class Browse extends Component {

  componentDidMount() {
    const { match: { params: { department } }, setDepartment } = this.props;
    setDepartment(department);
  }

  render() {
    const { match: { params: { department } } } = this.props;
    return (<div>Browse {department}</div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  setDepartment: (id) => dispatch(setDepartment(id)),
});

export default connect(null, mapDispatchToProps)(Browse);
