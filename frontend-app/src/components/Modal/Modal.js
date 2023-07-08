import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ModalConfirmation from "./ModalConfirm";
import ModalForm from "./ModalForm";
import ModalInfo from "./ModalInfo";
import "../../common-styles/page.css";
import "./Modal.css"

function Modal({ modal, setModal }) {
    const [valueTitle, setValueTitle] = useState("");
    const [valueDes, setValueDes] = useState("");
    const [type, setType] = useState([]);
    const [req, setReq] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEditModal,setEditModal] = useState(false)

    const isFormValid = valueTitle !== "" && valueDes !== "" && type !== "";
    const countType = (selectedType) => {
        return req.filter((request) => request.type === selectedType).length;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const newReq = {
            title: valueTitle,
            description: valueDes,
            type: type,
        };

        if (isEditModal && editIndex !== -1) {
            const updatedReq = [...req];
            updatedReq[editIndex] = newReq;
            setReq(updatedReq);
            setEditIndex(-1);
        } else {
            setReq([...req, newReq]);
        }
        setValueTitle("");
        setValueDes("");
        setType("");
        setEditModal(false)
        setModal(false)
    };

    const handleEdit = (index) => {
        const { title, description, type } = req[index];
        setValueTitle(title);
        setValueDes(description);
        setType(type);
        setEditIndex(index);
        setEditModal(true)
        setModal(true);
    };

    const handleDelete = (index) => {
        setShowConfirm(true);
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить заявку?");
        if (confirmDelete) {
            const updatedReq = [...req];
            updatedReq.splice(index, 1);
            setReq(updatedReq);
        }
        setShowConfirm(false);
    };
    const handleAdd=()=>{
        setEditModal(false)
        setModal(false)
    }
    const handleClose=()=>{
        setModal(false)
        setValueTitle("");
        setValueDes("");
        setType("");
        setEditIndex(-1)
        setEditModal(true)
    }

    return (
        <div>
            <ModalInfo req={req} handleEdit={handleEdit} handleDelete={handleDelete} />
            <div>
                <h2>Количество заявок по типу:</h2>
                <p>Электричество: {countType("Электричество")}</p>
                <p>Интернет: {countType("Интернет")}</p>
                <p>Другое: {countType("Другое")}</p>
            </div>

            {showConfirm && <ModalConfirmation setShowConfirm={setShowConfirm} />}
            {modal && (
                <div className="wrapper h-screen w-screen">
                    <div className="modal border-double">
                    <div
                            className="btn-close"
                            onClick={handleClose}
                            onKeyDown={handleClose}
                            tabIndex={0}
                            role="button"
                        >
                            <AiOutlineCloseCircle size={20} />
                        </div>

                        <h1 className="text-xl text-center">{editIndex !== -1 ? "Редактировать заявку" : "Добавить заявку"}</h1>
                        <ModalForm
                            handleSubmit={handleSubmit}
                            valueTitle={valueTitle}
                            setValueTitle={setValueTitle}
                            valueDes={valueDes}
                            setValueDes={setValueDes}
                            type={type}
                            setType={setType}
                            isFormValid={isFormValid}
                            editIndex={editIndex}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;

