import React, { useState } from "react";
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";

function App() {
  const [modal, setModal] = useState(false)
  const [clicked, setClicked] = useState(false)

  return (
    <div>
      <Header onOpen={setModal} clicked={clicked} setClicked={setClicked} />
      <Modal modal={modal} setModal={setModal}></Modal>
    </div>
  );
}

export default App;
