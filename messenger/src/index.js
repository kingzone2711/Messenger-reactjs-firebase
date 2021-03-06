import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store/index'
import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContext";
window.store=store
ReactDOM.render(
  
  <Provider store={store}>
    <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
      </AuthProvider>
    </React.StrictMode>
  </Provider>,
    document.getElementById('root')
);
reportWebVitals();
