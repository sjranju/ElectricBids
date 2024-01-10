import { Navigate, Outlet } from 'react-router-dom'
import Header from './components/header';
import { Provider } from 'react-redux';
import { store } from './store/appStore';
import UserContext, { userContext } from './utils/userContext';
import { useContext } from 'react';


function App() {
  const { user } = useContext(userContext)

  return (
    <Provider store={store}>
      <div className='app'>
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
