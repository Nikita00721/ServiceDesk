import React from "react";
import "./Modal.css"

function ModalItem({ index, request, handleEdit, handleDelete,countType }) {
    const { title, description, type } = request;

    return (
        <li>
            <div className="items-info">
                <p>{type}</p>
                <p>{title}</p>
                <p>{description}</p>
                <p>{countType(type)}</p>
            </div>
            <div>
                <button onClick={() => handleEdit(index)}>Редактировать</button>
                <button onClick={() => handleDelete(index)}>Удалить</button>
            </div>
        </li>
    );
}

export default ModalItem;