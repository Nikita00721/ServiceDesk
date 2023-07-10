
import React from "react";
import ModalItem from "./ModalItem";

function ModalInfo({ req, handleEdit, handleDelete, countType, isMainPage }) {
    const uniqueRequests = [];
    const duplicates = new Map();

    req.forEach((request) => {
        const { title, description } = request;
        const key = `${title}-${description}`;

        if (duplicates.has(key)) {
            duplicates.set(key, duplicates.get(key) + 1);
        } else {
            duplicates.set(key, 1);
            uniqueRequests.push(request);
        }
    });
    return (
        <div>
            <h2 className="flex justify-center text-2xl mt-2">Информация о заявке</h2>
            {req.length > 0 ? (
                <ul>
                    {uniqueRequests.map((request, index) => {
                        const count=countType(request)
                        const isMainPage=count===0
                        return(
                            <ModalItem
                            key={index}
                            request={request}
                            isMainPage={isMainPage}
                            count={duplicates.get(`${request.title}-${request.description}`)}
                            handleEdit={()=>handleEdit(index)}
                            handleDelete={()=>handleDelete(index)}
                        />
                        )
                    }
                        

                        
                    )}
                </ul>
            ) : (
                <p className="nothing">У вас пока нет заявок</p>
            )}
        </div>
    );
}

export default ModalInfo;
