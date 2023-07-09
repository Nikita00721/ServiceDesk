import React,{useState} from "react";
import Header from "../Header/Header";


function Work({setClicked,clicked}) {
  return (
    <div className="App">
      <Header setClicked={setClicked} clicked={true}></Header>
    </div> 
  );
}

export default Work;
