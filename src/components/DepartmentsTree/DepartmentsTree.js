import { connect } from 'react-redux';
import Tree from '../UI/Tree';
import {setMainNavigatorSelectedId, setMainNavigatorExpandedId} from '../../actions/app';

const mapStateToProps = (state) => {
  return {
    data: state.app.navigatorNodes,
    selectedId: state.app.mainNavigator.selectedId,
    expanded: state.app.mainNavigator.expanded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setExpanded: (id, value) => dispatch(setMainNavigatorExpandedId(id, value)),
    setSelected: (id) => dispatch(setMainNavigatorSelectedId(id)),
  }
};

const DepartmentsTree = connect(mapStateToProps, mapDispatchToProps)(Tree);

export default DepartmentsTree;
