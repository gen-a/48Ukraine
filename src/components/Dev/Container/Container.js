import React from 'react';
import ReduxExample from '../ReduxExample';
import ReduxConnect from '../ReduxConnect';
import Mouse from '../Mouse';
import PointerMotionDetect from '../../UI/Detect/MouseMotion';
import MouseSwipeDetect from '../../UI/Detect/MouseSwipe';
import TouchMotionDetect from '../../UI/Detect/TouchMotion';
import DepartmentsTree from '../../DepartmentsTree';


/**
 * Temporary place for component development
 */
const Container = () => (
  <>
    <DepartmentsTree />
    <MouseSwipeDetect>
      <div style={{ width: '500px', height: '500px', background: 'red' }}>
        <TouchMotionDetect>
          <div style={{ width: '200px', height: '200px', background: 'blue' }}/>
        </TouchMotionDetect>
      </div>
    </MouseSwipeDetect>
    <PointerMotionDetect>
      <div style={{ width: '500px', height: '500px' }}/>
    </PointerMotionDetect>
    <Mouse>
      {mouse => (
        <div style={{ height: '100%' }}>
          {mouse.x}
          -
          {mouse.y}
          <ReduxExample/>
          <ReduxConnect own="Own property"/>
        </div>
      )}
    </Mouse>
  </>

);

export default Container;
