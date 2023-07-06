import React from "react";
import {LuHome} from "react-icons/lu"
import "./Header.css"
import {CiSquareQuestion} from "react-icons/ci"

function Header({page}){
    function clickReq(){
        page.push('/working')
    }
    // function workReq(){

    // }
    return(
        <div className='w-screen text-white bg-red-500 h-14 flex pt-2 pl-60'>

            <div className="ml-3 rounded-xl border-solid py-1 px-1 mb-2">
                <a className="cursor-pointer"><LuHome size={24} /></a>
            </div>
            
            <div className="text-2xl font-bold ml-10">            
            Request List
            </div>

            <div className="flex pl-96">
            <div className="btn">
                <button onClick>
                    <span>Оставить Заявку</span>
                </button>
                </div>
                <div className="btn">
                <button onClick={clickReq}>
                    <span>Работа с типом заявок</span>
                </button>
                </div>     
            </div>         
        </div>

    )
}
export default Header;