import React from "react";
import "./Modal.css";

function ModalInfo({ req, countType }) {
    return (
        <div>
            <h2 className="flex justify-center text-2xl mt-2">Информация о заявке</h2>
            {req.length > 0 ? (
                <ul>
                    {req.map((request, index) => (
                        <li key={index} className="content-req">
                            <div className="items-info">
                                <div className="request">
                                    <p className="text-3xl">{request.type}</p>
                                    <p className="text-m">{request.title}</p>
                                    <p className="text-m descrip">{request.description}</p>
                                </div>
                                <div className="count-type">
                                    <p className="text-2xl">
                                        {countType(request.type)}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="nothing">У вас пока нет заявок</p>
            )}
        </div>
    );
}

export default ModalInfo;