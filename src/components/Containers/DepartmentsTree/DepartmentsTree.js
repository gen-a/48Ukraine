/**
 * Container Component for connecting tree with departments data
 * Control Expanded elements
 * @module DepartmentsTree
 */
import { connect } from 'react-redux';
import Tree from '../../UI/Tree/Tree';
import { expandNodeOfDepartmentTree } from '../../../actions/app';

const mapStateToProps = (state, ownProps) => {
  return {
    expanded: state.app.departmentsTree.expanded,
    data: ownProps.departments,
    selected: ownProps.currentDepartment,
    onSelect: ownProps.browse
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggle: (id, value) => dispatch(expandNodeOfDepartmentTree(id, value)),
  };
};

const DepartmentsTree = connect(mapStateToProps, mapDispatchToProps)(Tree);

export default DepartmentsTree;
