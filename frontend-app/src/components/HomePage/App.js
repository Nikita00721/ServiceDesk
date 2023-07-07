import React,{useState} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modals";

function App({req,setReq}) {
  // const[modalAdd,setModalAdd]=useState(false)
  // const[modalEdit,setModalEdit]=useState(false) 
  // const[modalDel,setModalDel]=useState(false)
  const[modal,setModal]=useState(false) 

  
  return (
    <div className="App">
      <Header/>      
      <Modal setModal={setModal} modal={modal}>
      </Modal>
      <Footer/>
    </div> 
  );
}

export default App;
