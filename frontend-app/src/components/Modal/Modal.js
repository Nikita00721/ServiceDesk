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
    const [email, setEmail] = useState("")
    const [editIndex, setEditIndex] = useState(-1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEditModal, setEditModal] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [titleError, setTitleError] = useState("")

    const isFormValid = valueTitle !== "" && valueDes !== "" && type !== "" && email !== "";
    const countType = (selectedType) => {
        return req.filter((request) => request.type === selectedType).length;
    };

    const validEmail = (email) => {
        const emailRe = /^\S+@\S+\.[a-zA-Z]+$/
        return emailRe.test(email)
    }
    const validTitle = (valueTitle) => {
        const titleRe = /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+$/;
        return titleRe.test(valueTitle)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validEmail(email)){
            setEmailError("Пожалуйста,введите правильный адрес электронной почты")
            setTitleError("")
            return
        } else if(!validTitle(valueTitle)){
            setTitleError("Пожалуйста,введите корректное ФИО")
            setEmailError("")
            return
        } else{
            setTitleError("")
            setEmailError("")

        }


        const newReq = {
            title: valueTitle,
            description: valueDes,
            type: type,
            email: email
        };

        if (isEditModal && editIndex !== -1) {
            const updatedReq = [...req];
            updatedReq[editIndex] = newReq;
            setReq(updatedReq);
            setEditIndex(-1);
        } else {
            setReq([...req, newReq]);
        }
        setEmailError("")
        setValueTitle("");
        setValueDes("");
        setType("");
        setEmail("")
        setEditModal(false)
        setModal(false)
    };

    const handleEdit = (index) => {
        const { title, description, type, email } = req[index];
        setValueTitle(title);
        setValueDes(description);
        setType(type);
        setEmail(email)
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
    const handleAdd = () => {
        setEditModal(false)
        setModal(false)
    }
    const handleClose = () => {
        setModal(false)
        setValueTitle("");
        setValueDes("");
        setType("");
        setEmail("")
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
                            email={email}
                            setEmail={setEmail}
                            emailError={emailError}
                            titleError={titleError}
                            setEmailError={setEmailError}
                            setTitleError={setTitleError}
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

