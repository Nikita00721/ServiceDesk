import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './common-styles/style.css'
import Work from './components/WorkPage/Work';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />}>
          </Route>
          <Route path="/working" element={<Work />}>
          </Route>
        </Routes>
    </BrowserRouter>
);

