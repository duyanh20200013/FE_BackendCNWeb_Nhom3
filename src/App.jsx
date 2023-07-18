import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { RouterProvider, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import Home from './views/Home';
import House from './views/House';
import Login from './views/Login';
import Signup from './views/Signup';
import Loading from './components/Loading';
import Modal from './components/modal/Modal';
import PrivateRoutes from './routes/PrivateRoutes';
import Hosting from './views/Hosting';
import Contract from './views/Contract';
import Trip from './views/Trip';
import Admin from './views/Admin';
import Admin1 from './views/Admin/Admin1';
import Admin2 from './views/Admin/Admin2';
import HostingReservations from './views/Hosting/screens/HostingReservations';
import HostingAdding from './views/Hosting/screens/HostingAdding';
import HostingDetails from './views/Hosting/screens/HostingDetails';
import HostingList from './views/Hosting/screens/HostingList';
import Account from './views/Account';
import AccountPayment from './views/Account/screens/AccountPayment';

function App() {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const isLoading = useSelector(state => state.app.isLoading);

  useEffect(() => {
    console.log('re-render app');
  });

  return (
    // <div>
    //   <RouterProvider router={routes}></RouterProvider>
    // </div>
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/house/:id" element={<House />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/all-house" element={<Admin1 />}></Route>
        <Route path="/admin/update-house" element={<Admin2 />}></Route>
        <Route path="/contract/:id" element={<Contract />}></Route>
        <Route path="/trip" element={<Trip />}></Route>
        <Route
          path="/hosting"
          element={<PrivateRoutes allowedRoles={['Owner']} />}
        >
          <Route path="" element={<Hosting />}></Route>
          <Route path="listing" element={<HostingList />}></Route>
          <Route path="reservations" element={<HostingReservations />}></Route>
          <Route path="adding" element={<HostingAdding />}></Route>
          <Route path=":id/details" element={<HostingDetails />}></Route>
        </Route>
        <Route
          path="/account-settings"
          element={<PrivateRoutes allowedRoles={['Owner', 'Admin', 'User']} />}
        >
          <Route path="" element={<Account />}></Route>
          <Route path="payments" element={<AccountPayment />}></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
      />
      {isLoading && <Loading />}
    </>
  );
}

export default App;
