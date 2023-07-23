import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import RequestByType from './components/pages/RequestByType';
import Types from './components/pages/Types';
import "./index.css"
import "./components/pages/style.css"


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/requests/types/:typeId" element={<RequestByType />} />
      <Route path="/types" element={<Types />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
