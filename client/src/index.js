import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/css/style.css'
import './Components/css/bootstrap.min.css'
import { RoleProvider } from './pages/userContext/RoleContext';
import { UserContextProvider } from './pages/userContext/Usercontext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RoleProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </RoleProvider>
    </BrowserRouter>
  </React.StrictMode>
);
