import React, { useState, useEffect } from "react";
import { LuHome } from "react-icons/lu"
import "./Header.css"
import { CiSquareQuestion } from "react-icons/ci"
import { useNavigate, useLocation, Link } from "react-router-dom"
// import ModalTypeForm from "../Modal/ModalTypeForm"


function Header({ onOpen, setShowModalType }) {

    const [pageTitle, setPageTitle] = useState("Главная страница")
    const [buttonContent, setButtonContent] = useState({
        text: "Оставить заявку",
        onClick: onOpen
    });

    const page = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/working") {
            setPageTitle("Работа с типами заявок");
            setButtonContent({
                text: "Добавить тип заявки",
                onClick: () => setShowModalType(true)
            });
        } else {
            setPageTitle("Главная страница");
            setButtonContent({
                text: "Оставить заявку",
                onClick: onOpen
            });
        }
    }, [location]);

    function clickReqType() {
        if(location.pathname==="/working"){
            page("/");
        }
        else{
            page("/working")
        }
        
    }


    return (

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
                    <button onClick={buttonContent.onClick}>
                        <span>{buttonContent.text}</span>
                    </button>
                </div>
                <div className="btn">
                    <button onClick={clickReqType}>
                        <span>{location.pathname === "/working" ? "Главная страница" : "Работа с типами заявок"}</span>
                    </button>
                </div>
            </div>
            
        </div>



    )
}
export default Header;