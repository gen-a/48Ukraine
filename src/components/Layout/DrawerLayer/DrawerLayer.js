/**
 * ToolBar Component.
 * Call onChange function
 * @module ToolBar
 */
import React from 'react';
import PropTypes from 'prop-types';
import DepartmentsNavigator from '../../Containers/DepartmentsNavigator';
import ScrollBox from '../../UI/ScrollBox';
import AuthenticationForm from '../../Forms/AuthenticationForm/AuthenticationForm';
import Drawer from '../../UI/Drawer';
/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Position on the screen. */
  open: PropTypes.oneOf(['', 'top', 'right', 'bottom', 'left']),
};
/**
 * Default settings for move detection.
 * @type {object}
 */
const defaultProps = {
  open: '',
};

const DrawerLayer = ({ open }) => (
  <>
    <Drawer position="left" depth={50} isOpen={ open === 'menu' } header="Departments">
      <ScrollBox>
        <DepartmentsNavigator />
      </ScrollBox>
    </Drawer>
    <Drawer position="right" depth={50} isOpen={ open === 'user' } header="User Data">
      <AuthenticationForm />
    </Drawer>
  </>
);

export default DrawerLayer;
