/**
 * ToolBar Component.
 * Call onChange function
 * @module ToolBar
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DepartmentsNavigator from '../../Containers/DepartmentsNavigator';
import ScrollBox from '../../UI/ScrollBox';
import Authentication from '../../Widgets/Authentication';
import Drawer from '../../UI/Drawer';
import Scrim from '../../Containers/Scrim';
import { setOpenDrawer } from '../../../actions/app';
/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Position on the screen. */
  openDrawer: PropTypes.oneOf(['', 'menu', 'user']),
  /** Function to change open drawer. */
  callSetOpenDrawer: PropTypes.func.isRequired
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  openDrawer: '',
};

const DrawerLayer = ({ callSetOpenDrawer, openDrawer }) => (
  <>
    <Scrim id="DrawerLayer" onClick={() => callSetOpenDrawer('')} isVisible={openDrawer !== ''} />
    <Drawer position="left" depth={50} isOpen={openDrawer === 'menu'} header="Departments">
      <ScrollBox>
        <div style={{paddingRight: '16px'}}>
          <DepartmentsNavigator />
        </div>
      </ScrollBox>
    </Drawer>
    <Drawer position="right" depth={50} isOpen={openDrawer === 'user'} header="User Data">
      <Authentication />
    </Drawer>
  </>
);

DrawerLayer.defaultProps = defaultProps;
DrawerLayer.propTypes = propTypes;

const mapStateToProps = state => (
  {
    openDrawer: state.app.openDrawer,
  }
);

const mapDispatchToProps = dispatch => (
  {
    callSetOpenDrawer: name => dispatch(setOpenDrawer(name)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(DrawerLayer);

