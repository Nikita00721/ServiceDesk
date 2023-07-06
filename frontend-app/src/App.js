import React,{useState} from "react";
import Header from "./components/Header/Header";
import AddReq from "./components/AddReq/AddReq";
import Footer from "./components/Footer/Footer";
import ReqList from "./components/ReqList/ReqList";


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
