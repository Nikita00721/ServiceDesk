import React,{useState} from "react";
import ModalTypeForm from "./ModalTypeForm";
import { AiOutlineCloseCircle } from "react-icons/ai";


function ModalType({valueDes,setValueDes,showModalType,setShowModalType,req,setReq}){
    const [typeTitleError,setTypeTitleError] = useState("")
    const [typeTitle,setTypeTitle]=useState("")
    const isFormValidType = typeTitle!==""&&valueDes!=="" ;
    const validTitleType = (typeTitle) => {
        const titleRe = /^[a-zA-Zа-яА-Я]+$/;
        return titleRe.test(typeTitle)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validTitleType(typeTitle)) {
            setTypeTitleError("Пожалуйста,введите корректное ФИО")
            return
        } else {
            setTypeTitleError("")

        }
        const newReq = {
            typeTitle: typeTitle,
            valueDes: valueDes
        };


        const existingReqIndex = req.findIndex((item) => item.type === newReq.type);

        if (existingReqIndex !== -1) {
            setReq((prevReq) => {
                const updatedReq = [...prevReq];
                updatedReq[existingReqIndex] = newReq;
                return updatedReq;
            });
        } else {
            setReq((prevReq) => [...prevReq, newReq]);
            
        }

        setValueDes("");
        setTypeTitle("")
        setShowModalType(false);
    };
    return(
        <div>
            {showModalType &&(
                <div className="wrapper h-screen w-screen">
                <div className="modal border-double">
                    <div
                        className="btn-close"
                        onClick={()=>setShowModalType(false)}
                        onKeyDown={()=>setShowModalType(false)}
                        tabIndex={0}
                        role="button"
                    >
                        <AiOutlineCloseCircle size={20} />
                    </div>

                    <h1 className="text-xl text-center text-black">Добавить тип заявки</h1>
                    <ModalTypeForm 
                    typeTitleError={typeTitleError}
                    setTypeTitle={setTypeTitle}
                    setShowModalType={setShowModalType}
                    showModalType={showModalType}
                    typeTitle={typeTitle}
                    valueDes={valueDes}
                    setValueDes={setValueDes}
                    setTypeTitleError={setTypeTitleError}
                    />
                    </div>
                    </div>
                    
            )}

        </div>
    )
}
export default ModalType