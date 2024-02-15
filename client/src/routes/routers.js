import React, { lazy, Suspense } from 'react';
import { Component } from 'react';
import { Route } from 'react-router-dom';
import Loading from '../components/Loading/Loading';


const retryLoadComponent = (fn, retriesLeft = 5, interval = 1000) =>
  new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error);
            return;
          }

          retryLoadComponent(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
  
const Home = lazy(() => retryLoadComponent(() => import('../pages/Home')));
const Login = lazy(() => retryLoadComponent(() => import('../pages/Auth/Login')));
const Register = lazy(() => retryLoadComponent(() => import('../pages/Auth/Register')));
const Profile = lazy(() => retryLoadComponent(() => import('../pages/Profile')));

export const LayoutPaths = {
    Guest: '/',
    Auth: '/auth',
    Admin: '/admin',
  };

  export const Paths = {
    Home: '/home',
    Login: '/login',
    Register: '/register',
   
    Rest: '*',
  };

  
export const Pages = {
    Home,
    Login,
    Register,
    Profile
  
  };
  export const PublicRoute = ({  component: Component, ...rest }) => (
   

    <React.Suspense fallback={<Loading/>}>
  
    </React.Suspense>
   
  );
  
/* export const AuthRoute = ({ component: Component, ...rest }) => {
    const loggedIn: string | any = Helpers.getAccessToken();
  
    return loggedIn ? (
      <Redirect noThrow from={Paths.Rest} to={LayoutPaths.Admin} />
    ) : (
      <Suspense fallback={<Loading />}>
        <Component {...rest} />
      </Suspense>
    );
  };
  
  export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const loggedIn: string | any = Helpers.getAccessToken();
  
    return loggedIn ? (
      <Suspense fallback={<Loading />}>
        <Component {...rest} />
      </Suspense>
    ) : (
      <Redirect noThrow from={Paths.Rest} to={LayoutPaths.Auth} />
    );
  };
   */