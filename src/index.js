import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/todoStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // using the provider to implement the redux logic
  <Provider store={store}>
    <App />
  </Provider>
);
