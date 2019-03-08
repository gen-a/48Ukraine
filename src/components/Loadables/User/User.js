/**
 * Asynchronous Loading User Section Component
 * @module User
 */
import Loadable from 'react-loadable';
import Loading from '../Loading';

const User = Loadable({
  loader: () => import('../../../pages/User'),
  loading:Loading,
  delay: 300,
  timeout: 10000
});

export default User;