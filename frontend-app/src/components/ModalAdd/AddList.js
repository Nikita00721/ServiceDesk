import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import ModalForm from "./ModalForm";
import ModalInfo from "./ModalInfo";
import "./Modal.css"

function AddList({ modal, setModal }) {
    const [valueTitle, setValueTitle] = useState("");
    const [valueDes, setValueDes] = useState("");
    const [type, setType] = useState("");
    const [req, setReq] = useState([]);
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [titleError, setTitleError] = useState("")
    


    const isFormValid = valueTitle !== "" && valueDes !== "" && type !== "" && email !== "" ;
    const countType = (selectedType) => {
    let total=0;
        req.forEach((request)=>{
            if (request.type===selectedType){
                total++
            }
        })
        return total
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

        if (!validEmail(email)) {
            setEmailError("Пожалуйста,введите правильный адрес электронной почты")
            setTitleError("")
            return
        } else if (!validTitle(valueTitle)) {
            setTitleError("Пожалуйста,введите корректное ФИО")
            setEmailError("")
            return
        } else {
            setTitleError("")
            setEmailError("")

        }
        const newReq = {
            title: valueTitle,
            description: valueDes,
            type: type,
            email: email
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
        setValueTitle("");
            setValueDes("");
            setType("");
            setEmail("");
            setModal(false);

        // try {
        //     const response = await fetch("/api/requests", {
        //     method: "POST",
        //     headers: {
        //     "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(newReq),
        //     });
            
        //     if (!response.ok) {
        //     throw new Error("Failed to create request");
        //     }
            
        //     const createdRequest = await response.json();
        //     setReq((prevReq) => [...prevReq, createdRequest]);
            
        //     setValueTitle("");
        //     setValueDes("");
        //     setType("");
        //     setEmail("");
        //     setModal(false);
        //     } catch (error) {
        //     console.error(error);
        //     }
    };

    const handleClose = () => {
        setModal(false)
        setValueTitle("");
        setValueDes("");
        setType("");
        setEmail("")
    }

    return (
        <div>
            <ModalInfo req={req} countType={countType}/>

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

                        <h1 className="text-xl text-center">Добавить заявку</h1>
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
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddList;

