import React,{useState} from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";

function App() {
  const[modal,setModal]=useState(false) 

  // const openModal=()=>{
  //   setModal(true)
  // }
  
  return (
    <div className="App">
      <Header onOpen={setModal}/>
      <Modal modal={modal} setModal={setModal}></Modal>      
      <Footer/>
    </div> 
  );
}

export default App;
