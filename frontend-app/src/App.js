import React, { useState } from "react";
import Work from './components/Pages/Work';
import Home from "./components/Pages/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  
  return (
    // <div></div>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}>
          </Route>
          <Route path="/working" element={<Work />}>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
