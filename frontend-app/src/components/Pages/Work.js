import React,{useState} from "react";
import Header from "../Header/Header";
import ModalType from "../Modal/ModalType"

function Work() {
  const [showModalType, setShowModalType] = useState(false);
  
  return (
    <div className="App">
      <Header onOpen={setShowModalType}/>
      <ModalType showModalType={showModalType} setShowModalType={setShowModalType}/>
    </div> 
  );
}

export default Work;
