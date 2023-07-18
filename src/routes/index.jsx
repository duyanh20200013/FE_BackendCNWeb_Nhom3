import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import House from '../views/House';
import Login from '../views/Login';
import Signup from '../views/Signup';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/test',
    element: <div>Test routes</div>,
  },
  {
    path: '/house/:id',
    element: <House />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

export default routes;
