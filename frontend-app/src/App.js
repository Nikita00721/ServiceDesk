import React,{useState} from "react";
import Header from "./components/Header/Header";
import AddReq from "./components/AddReq/AddReq";
import Footer from "./components/Footer/Footer";
import ReqList from "./components/ReqList/ReqList";
import Work from './Work';
import {Routes} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [req,setReq]=useState([
    {
      id: 1,
      status: false,
      title: 'first',
    },
    {
      id: 2,
      status: true,
      title: 'sec',
    },
    {
      id: 3,
      status: true,
      title: 'third',
    }
  ])
  return (
    <div className="App">
      <Header/>
      {/* <Router>
      <div>
        <nav>
          <Link to="/"></Link>
          <Link to="/working"></Link>
        </nav>
        <Switch>
          <Route path="/">
            <App />
          </Route>
          <Route path="/working">
            <Work />
          </Route>
        </Switch>
      </div>
    </Router> */}
      <AddReq req={req} setReq={setReq}/>
      <ReqList req={req} setReq={setReq}/>
      <Footer/>
    </div> 
  );
}

export default App;
