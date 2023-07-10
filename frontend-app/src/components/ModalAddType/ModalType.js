import React,{useState} from "react";
import ModalTypeForm from "./ModalTypeForm";
import { AiOutlineCloseCircle } from "react-icons/ai";
import RequestList from "./RequestList";
import ModalConfirmation from "../ModalAdd/ModalConfirm";

function ModalType({showModalType,setShowModalType}){
    const [typeTitleError,setTypeTitleError] = useState("")
    const [reqType,setReqType]=useState([])
    const [valueDesType,setValueDesType]=useState("")
    const [typeTitle,setTypeTitle]=useState("")
    const [showConfirm, setShowConfirm] = useState(false);
    const isFormValidType = typeTitle!==""&&valueDesType!=="" ;
    const validTitleType = (typeTitle) => {
        const titleRe = /^[a-zA-Zа-яА-Я]+$/;
        return titleRe.test(typeTitle)
    }
    const handleDelete = (index) => {
        setShowConfirm(true);
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить заявку?");
        if (confirmDelete) {
            const updatedReq = [...reqType];
            updatedReq.splice(index, 1);
            setReqType(updatedReq);
        }
        setShowConfirm(false);
    };
    const handleEdit = (index) => {
        if (reqType[index]) {
            const { typeTitle,typeDes } = reqType[index];
            setTypeTitle(typeTitle)
            setValueDesType(typeDes);
            
        }
    };

    const handleSubmitType = (e) => {
        e.preventDefault();

        if (!validTitleType(typeTitle)) {
            setTypeTitleError("Пожалуйста,введите корректное ФИО")
            return
        } else {
            setTypeTitleError("")

        }
        const newReq = {
            typeTitle: typeTitle,
            valueDesType: valueDesType
        };
        setReqType((prevReq) => [...prevReq, newReq]);

        // const existingReqIndex = reqType.findIndex((item) => item.type === newReq.type);

        // if (existingReqIndex !== -1) {
        //     setReq((prevReq) => {
        //         const updatedReq = [...prevReq];
        //         updatedReq[existingReqIndex] = newReq;
        //         return updatedReq;
        //     });
        // } else {
        //     setReq((prevReq) => [...prevReq, newReq]);
            
        // }

        setValueDesType("");
        setTypeTitle("")
        setShowModalType(false);
    };
    return(
        <div>
            <RequestList reqType={reqType} handleDelete={handleDelete} handleEdit={handleEdit}/>
            {showConfirm && <ModalConfirmation setShowConfirm={setShowConfirm} />}
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
                    valueDesType={valueDesType}
                    setValueDesType={setValueDesType}
                    setTypeTitleError={setTypeTitleError}
                    isFormValidType={isFormValidType}
                    handleSubmitType={handleSubmitType}
                    />
                    </div>
                    </div>
                    
            )}

        </div>
    )
}
export default ModalType