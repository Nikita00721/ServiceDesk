import React, { useState, useEffect } from "react";
import { LuHome } from "react-icons/lu"
import "./Header.css"
import { useNavigate, useLocation, Link } from "react-router-dom"


function Header({ onOpen, setModalIsOpenType }) {

    const [pageTitle, setPageTitle] = useState("Главная страница")

    const [buttonContent, setButtonContent] = useState({
        text: "Добавить заявку",
        onClick: onOpen
    });

    const page = useNavigate();
    const location = useLocation();


    const mainPage = () => {
        page("/")
    }

    useEffect(() => {
        if (location.pathname === "/types") {
            setPageTitle("Работа с типами заявок");
            setButtonContent({
                text: "Добавить тип заявки",
                onClick: () => setModalIsOpenType(true)
            });
        } else if (location.pathname === "/") {
            setPageTitle("Главная страница");
            setButtonContent({
                text: "Добавить заявку",
                onClick: onOpen
            });
        } else {
            setPageTitle("Ваши заявки");
            setButtonContent({
                text: "Главная страница",
                onClick: mainPage
            })
        }
    }, [location, mainPage]);


    function clickReqType() {
        if (location.pathname === "/types") {
            page("/");
        }
        else if (location.pathname === "/") {
            page("/types")
        }
        else {
            page("/types")
        }
    }


    return (

        <div className='w-screen text-white bg-red-500 h-14 flex items-center justify-between px-10'>


            <div className="flex items-center">
                <Link to="/" className="ml-3 rounded-xl py-1 px-1 us-border cursor-pointer">
                    <LuHome size={24} />
                </Link>
                <div className="text-2xl font-bold mx-2">
                    ServiceDesk
                </div>
            </div>

            <div className="text-center flex-grow items-center flex justify-center">
                <div className="text-2xl font-bold">
                    {pageTitle}
                </div>
            </div>


            <div className="flex pl-96">
                <button className="btn" onClick={buttonContent.onClick}>
                    <span>{buttonContent.text}</span>
                </button>


                <button className="btn" onClick={clickReqType}>
                    <span>{location.pathname === "/types" ? "Главная страница" :
                        location.pathname === "/" ? "Работа с типами заявок" : "Работа с типами заявок"}</span>
                </button>
            </div>

        </div>



    )
}
export default Header