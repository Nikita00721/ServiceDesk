import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import RequestEdit from './RequestEdit';
import RequestByType from './RequestByType';
import TypeEdit from './TypeEdit';
import Types from './Types';


ReactDOM.render(
  <BrowserRouter>
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/request-edit/:id" element={<RequestEdit />} />
     <Route path="/request-by-type/:id" element={<RequestByType />} />
     <Route path="/type-edit/:id" element={<TypeEdit />} />
     <Route path="/types" element={<Types />} />
   </Routes>
  </BrowserRouter>
  ,
  document.getElementById('root')
);
