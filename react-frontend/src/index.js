import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import RequestEdit from './components/pages/RequestEdit';
import RequestByType from './components/pages/RequestByType';
import TypeEdit from './components/pages/TypeEdit';
import Types from './components/pages/Types';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/request-edit/:id" element={<RequestEdit />} />
      <Route path="/request-by-type/:id" element={<RequestByType />} />
      <Route path="/type-edit/:id" element={<TypeEdit />} />
      <Route path="/types" element={<Types />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
