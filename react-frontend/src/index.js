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
      <Route path="/requests/types/:typeId" element={<RequestByType />} />
      <Route path="/request-edit/:id" element={<RequestEdit />} />
      <Route path="/types" element={<Types />} />
      <Route path="/types/:id/edit" element={<TypeEdit />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
