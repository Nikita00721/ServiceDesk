
import React from "react";
import ModalItem from "./ModalItem";

function ModalInfo({ req, handleEdit, handleDelete }) {
    return (
        <div>
            <h2>Информация о заявке</h2>
            {req.length > 0 ? (
                <ul>
                    {req.map((request, index) => (
                        <ModalItem
                            key={index}
                            index={index}
                            request={request}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            ) : (
                <p>У вас пока нет заявок</p>
            )}
        </div>
    );
}

export default ModalInfo;
