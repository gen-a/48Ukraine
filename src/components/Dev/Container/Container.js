import React from 'react';
import DepartmentsNavigator from '../../Containers/DepartmentsNavigator';
import { Route } from 'react-router-dom';
import ToggleMenuIcon from '../../Containers/ToggleMenuIcon';
import ScrollBox from '../../UI/ScrollBox';
/**
 * Temporary place for component development
 */
const Container = () => (
  <>


    <ToggleMenuIcon />
    <DepartmentsNavigator />
  <div style={{width: '200px', height: '200px', position: 'relative'}}>
    <ScrollBox>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, sapiente!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis,
      cumque dolorem eius hic laboriosam laborum modi odit pariatur placeat,
      porro quam quos recusandae suscipit, temporibus ullam veniam!
      Alias amet asperiores consequuntur dignissimos earum enim et eveniet,
      facilis fugiat impedit incidunt iure magnam mollitia nihil nostrum
      omnis provident quam quasi quibusdam quis repellat repellendus
      repudiandae saepe sit temporibus, vel voluptate. Alias, aliquam dolorem,
      excepturi expedita facilis illum, impedit ipsa nemo quaerat reprehenderit
      sapiente temporibus veritatis? Aut autem consectetur dolorem eveniet expedita
      inventore labore laudantium molestias,
      necessitatibus nemo nulla placeat quam saepe totam voluptates.
      Dolorum id iste modi non repellat sunt!
    </ScrollBox>
  </div>
  </>
);

export default props => <Route render={routeProps => <Container {...routeProps} {...props} />} />;
