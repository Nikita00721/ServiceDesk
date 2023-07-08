import React from "react";

function ModalItem({ index, request, handleEdit, handleDelete }) {
    const { title, description, type } = request;

    return (
        <li>
            <div>
                <h3>Заголовок</h3>
                <p>Описание</p>
                <p>Тип</p>
            </div>
            <div>
                <p>{title}</p>
                <p>{description}</p>
                <p>{type}</p>
            </div>
            <div>
                <button onClick={() => handleEdit(index)}>Редактировать</button>
                <button onClick={() => handleDelete(index)}>Удалить</button>
            </div>
        </li>
    );
}

export default ModalItem;