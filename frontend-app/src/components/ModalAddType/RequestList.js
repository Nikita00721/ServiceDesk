import React from "react";
import { AiOutlineDelete } from "react-icons/ai"
import { AiOutlineEdit } from "react-icons/ai"


function RequestList({ reqType,handleEdit, handleDelete }) {
   

    return (
        <div>
            <h2 className="flex justify-center text-2xl mt-2">Типы заявок</h2>
            {reqType.length > 0 ? (
                <ul>

                    {reqType.map((request, index) => (
                        <li className="content-req">
                            <div className="items-info">
                                <div className="request">
                                    <li key={index}>
                                        <p className="text-3xl"> {request.typeTitle}</p>
                                        <p className="text-m descrip"> {request.valueDesType}</p>
                                    </li>
                                </div>
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
                    ))}
                </ul>
            ) : (
                <div>
            <p className="nothing">У вас пока нет заявок<br />Добавьте типы, пожалуйста</p>
            </div>
            )}



        </div>
    );
}

export default RequestList;