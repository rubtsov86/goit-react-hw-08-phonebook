import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ContactsView from '../views/ContactsView';
import LoginView from '../views/LoginView';
import HomeView from '../views/HomeView';
import RegisterView from '../views/RegisterView';
import AppBar from '../views/AppBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshCurrentUser } from '../redux/auth/auth-operations';
// import PrivateRoute from './PrivateRoute';
import {
  getIsLoggedIn,
  getIsRefreshingCurrentUser,
} from 'redux/auth/auth-selectors';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshingCurrentUser = useSelector(getIsRefreshingCurrentUser);

  useEffect(() => {
    dispatch(refreshCurrentUser());
  }, [dispatch]);

  return (
    !isRefreshingCurrentUser && (
      <div
        style={{
          paddingLeft: 20,
          color: '#010101',
        }}
      >
        <AppBar />
        <Suspense fallback={<div>Загрузка</div>}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/register" element={<RegisterView />}></Route>
            <Route
              path="/login"
              element={
                isLoggedIn ? <Navigate replace to="/contacts" /> : <LoginView />
              }
            ></Route>

            <Route
              path="/contacts"
              element={
                isLoggedIn ? <ContactsView /> : <Navigate replace to="/login" />
              }
            ></Route>

            <Route
              element={<h2>404 error, this page doesn't exist</h2>}
            ></Route>
          </Routes>
        </Suspense>

        <Toaster
          toastOptions={{
            className: '',
            style: {
              fontSize: 16,
            },
          }}
        />
      </div>
    )
  );
}

export default App;
