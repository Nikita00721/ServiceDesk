import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import AddList from "../ModalAdd/AddList";
import axios from "axios"


function Home({setReq}) {
  const [modal, setModal] = useState(false)
  // const [data,setData]=useState([])

  // useEffect(()=>{
  //   fetchData();
  // },[])
  // const fetchData=async()=>{
  //   try{
  //     const response=await axios.get("/api/types")
  //     setData(response.data)
  //   }catch(error){
  //     console.error("Ошибка при получении данных",error)
  //   }
  // }
  // useEffect(() => {
  //   // Fetch request types from the server
  //   fetch('/api/request-types')
  //     .then(response => response.json())
  //     .then(data => setReq(data))
  //     .catch(error => console.error('Error:', error));
  // }, []);

  return (
    <div>
      <Header onOpen={setModal}/>
      <AddList modal={modal} setModal={setModal}></AddList>
    </div>
  );
}

export default Home;
