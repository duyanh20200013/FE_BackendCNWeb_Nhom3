import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css'; // Style for markdown editor
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  // </React.StrictMode>,
);
