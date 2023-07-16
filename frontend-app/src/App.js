import React, { useState } from "react";
import Work from './components/Pages/Work';
import Home from "./components/Pages/Home";
import EditType from "./components/Pages/EditType";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Requests from "./components/Pages/Requests";


function App({modal,setModal}) {
  const [valueDesType,setValueDesType]=useState("")
  const [typeTitle,setTypeTitle]=useState("")
  const isFormValidType = typeTitle!==""&&valueDesType!=="" ;
  const [reqType,setReqType]=useState([])

  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}>
          </Route>
          <Route path="/working" element={<Work />}>
          </Route>
          <Route path="/editPageType" element={<EditType 
          isFormValidType={isFormValidType} 
          typeTitle={typeTitle} 
          setTypeTitle={setTypeTitle} 
          valueDesType={valueDesType}
          setValueDesType={setValueDesType}
          reqType={reqType}
          setReqType={setReqType}
          />}>
          </Route>
          <Route path="/reqPage" element={<Requests modal={modal} setModal={setModal}/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
