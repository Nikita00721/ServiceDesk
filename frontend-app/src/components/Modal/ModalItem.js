import React from "react";
import "./Modal.css"
import {AiOutlineDelete} from "react-icons/ai"
import {AiOutlineEdit} from "react-icons/ai"
function ModalItem({ index, request, handleEdit, handleDelete,countType }) {
    const { title, description, type } = request;

    return (
        <li className="content-req">
            <div className="items-info">
                <div className="request">
                <p className="text-3xl">{type}</p>
                <p className="text-m">{title}</p>
                <p className="text-m">{description}</p>
                </div>                
                <p className="text-xl count-type">{countType(type)}</p>
            </div>
            <div className="actions">
                <button className="icons edit" onClick={() => handleEdit(index)}>
                    <div className="tooltip">Редактировать</div>
                    <span><AiOutlineEdit className="icon" size={24}></AiOutlineEdit></span>
                    </button>
                <button className="icons del" onClick={() => handleDelete(index)}>
                <div className="tooltip">Удалить</div>
                    <span><AiOutlineDelete className="icon" size={24}></AiOutlineDelete></span>
                    </button>
            </div>
        </li>
    );
}

export default ModalItem;