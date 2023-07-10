import React, { useState , useEffect} from "react";
import {LuHome} from "react-icons/lu"
import "./Header.css"
import {CiSquareQuestion} from "react-icons/ci"
import {useNavigate,useLocation,Link} from "react-router-dom"

function Header({onOpen}){

    const[pageTitle,setPageTitle]=useState("Главная страница")
    const page = useNavigate();
    const location=useLocation()
    useEffect(()=>{
        if(location.pathname=="/working"){
            setPageTitle("Работа с типами заявок")   
        }else{
            setPageTitle("Главная страница")   
        }
    })
    function clickReqType(){  
        page('/working')        
    }
    
    return(
        
        <div className='w-screen text-white bg-red-500 h-14 flex items-center justify-between px-10'>

            
            <div className="flex items-center">
            <div className="ml-3 rounded-xl border-solid py-1 px-1">
                <Link to="/" className="cursor-pointer"><LuHome size={24} /></Link>
            </div>
            <div className="text-2xl font-bold mx-2">            
            Request List
            </div>
            </div>
            
            <div className="text-center flex-grow items-center flex justify-center">
            <div className="text-2xl font-bold">            
            {pageTitle}
            </div>
            </div>
            
            <div className="flex pl-96">
            <div className="btn">
                <button onClick={onOpen}>
                    <span>Оставить заявку</span>
                </button>
                </div>
                <div className="btn">
                <button onClick={clickReqType} >
                    <span>Работа с типами</span>
                </button>
                </div>     
            </div>         
        </div>
        

    )
}
export default Header;