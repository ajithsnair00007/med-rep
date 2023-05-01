import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './components/router';
import { Provider } from 'react-redux';
import store from './components/store/store';
import AutoLogin from './components/auth/AutoLogin';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
       <AutoLogin>
        <RouterProvider router={router}/>
        </AutoLogin>
    </Provider>
  </React.StrictMode>
);
