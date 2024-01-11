import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Footer from './components/footer';
import Login from './components/login';
import Placebid from './components/placebid';
import Body from './components/body';
import BidHistory from './components/bidHistory';
import useAuthListener from './utils/useAuthListener';
import UserContext from './utils/userContext';
import { SkeletonTheme } from 'react-loading-skeleton';

const appRouter = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <>
          <Body />
          <Footer />
        </>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/placebid',
        element: <Placebid />
      },
      {
        path: '/bidhistory',
        element: <BidHistory />
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserContext>
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
        <RouterProvider router={appRouter} />
      </SkeletonTheme>
    </UserContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
