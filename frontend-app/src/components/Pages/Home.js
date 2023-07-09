import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import axios from "axios"

function Home() {
  const [modal, setModal] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [data,setData]=useState([])

  useEffect(()=>{
    fetchData();
  },[])
  const fetchData=async()=>{
    try{
      const response=await axios.get("/api/data")
      setData(response.data)
    }catch(error){
      console.error("Ошибка при получении данных",error)
    }
  }

  return (
    <div>
      <Header onOpen={setModal} clicked={clicked} setClicked={setClicked} />
      <Modal modal={modal} setModal={setModal}></Modal>
    </div>
  );
}

export default Home;
