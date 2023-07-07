import React,{useState} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ModalAdd from "../Modal/ModalAdd";

function App({req,setReq}) {
  const[modal,setModal]=useState(true)  
  return (
    <div className="App">
      <Header/>      
      <ModalAdd modal={modal} setModal={setModal}></ModalAdd>
      <Footer/>
    </div> 
  );
}

export default App;
