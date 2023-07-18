import { Outlet, Navigate } from 'react-router-dom';
import PreferenceKeys from '@/general/constants/PreferenceKeys';

function PrivateRoutes({ allowedRoles }) {
  const isAuth =
    !!localStorage.getItem(PreferenceKeys.accessToken) &&
    !!localStorage.getItem(PreferenceKeys.refreshToken);

  const user = JSON.parse(localStorage.getItem(PreferenceKeys.user));
  const role = user?.role;
  console.log('Privateroutes ', allowedRoles?.includes(role));

  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : isAuth ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoutes;
