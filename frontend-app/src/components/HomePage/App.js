import React,{useState} from "react";
import Header from "../Header/Header";
import AddReq from "../AddReq/AddReq";
import Footer from "../Footer/Footer";
import ReqList from "../ReqList/ReqList";

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
      <AddReq req={req} setReq={setReq}/>
      <ReqList req={req} setReq={setReq}/>
      <Footer/>
    </div> 
  );
}

export default App;
