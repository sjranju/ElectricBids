import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Footer from './components/footer';
import Header from './components/header';
import Login from './components/login';
import Placebid from './components/placebid';
import Body from './components/body';
import UserContext from './utils/userContext';
import { Provider } from 'react-redux';
import { store } from './store/appStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

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
        element: <>
          <Placebid />
        </>
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContext>
        <RouterProvider router={appRouter} />
      </UserContext>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
