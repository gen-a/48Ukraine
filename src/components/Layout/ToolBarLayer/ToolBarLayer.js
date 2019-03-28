/**
 * ToolBar Component.
 * Call onChange function
 * @module ToolBar
 */
import React from 'react';
import { MdMenu, MdPerson } from 'react-icons/md';
import ToolBar from '../../UI/ToolBar';
import ToggleDrawer from '../../Containers/ToggleDrawer';
import WindowSize from '../../Containers/WindowSize';

const ToolBarLayer = () => (
  <WindowSize
    render={() => (
      <>
      <ToolBar position="topLeft" depth={100}>
        <ToggleDrawer
          name="menu"
          size={38}
          svg={<MdMenu size="100%" />}
        />
      </ToolBar>
      <ToolBar position="topRight" depth={100}>
        <ToggleDrawer
          name="user"
          size={38}
          svg={<MdPerson size="100%" />}
        />
      </ToolBar>
      </>
    )}
  />
);

export default ToolBarLayer;
