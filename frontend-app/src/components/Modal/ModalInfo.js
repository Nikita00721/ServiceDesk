import React from "react";
import ModalItem from "./ModalItem";

function ModalInfo({ req, handleEdit, handleDelete, countType, isMainPage, userReqCount }) {


    return (
        <div>
            <h2 className="flex justify-center text-2xl mt-2">Информация о заявке</h2>
            {req.length > 0 ? (
                <ul>
                    {req.map((request, index)=>(

                                <ModalItem
                                    key={index}
                                    request={request}
                                    countType={()=>countType(request.type)}
                                    handleEdit={() => handleEdit(index)}
                                    handleDelete={() => handleDelete(index)}
                                />

                    ))}
                </ul>
            ) : (
                <p className="nothing">У вас пока нет заявок</p>
            )}
        </div>
    );
}
export default ModalInfo