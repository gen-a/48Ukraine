/**
 * ToolBar Component.
 * Call onChange function
 * @module ToolBar
 */
import React, { useState, useEffect } from 'react';
import { MdMenu, MdPerson } from 'react-icons/md';
import ToolBar from '../../UI/ToolBar';
import ToggleDrawer from '../../Containers/ToggleDrawer';
import WindowSize from '../../Containers/WindowSize';

const ToolBarLayer = () => {
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInitialised(true);
    }, 500);
    return () => clearTimeout(timeout);
  });


  return (
    <WindowSize
      render={() => {
        return (
          <>
          <ToolBar position="topLeft" isVisible={initialised} depth={100}>
            <ToggleDrawer
              name="menu"
              size={38}
              svg={<MdMenu size="100%"/>}
            />
          </ToolBar>
          <ToolBar position="topRight"  isVisible={initialised} depth={100}>
            <ToggleDrawer
              name="user"
              size={38}
              svg={<MdPerson size="100%"/>}
            />
          </ToolBar>
          </>
        );
      }}
    />
  );
};

export default ToolBarLayer;
