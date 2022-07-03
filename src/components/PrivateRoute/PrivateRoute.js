import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';

// export default function PrivateRoute(props) {
//   const isLoggedIn = useSelector(getIsLoggedIn);
//   return {isLoggedIn ? props : <Navigate path="/login" />};
// }
