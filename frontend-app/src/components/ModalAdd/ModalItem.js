import React from "react";
import "./Modal.css"

function ModalItem({ request, countType}) {
    const { title, description, type } = request;

    return (
        <li className="content-req">
            <div className="items-info">
                <div className="request">
                <p className="text-3xl">{type}</p>
                <p className="text-m">{title}</p>
                <p className="text-m descrip">{description}</p>
                </div>                
                
                    <div className="count-type">
                    <p className="text-2xl">{countType(type)}</p>
                    </div>

            </div>
            
        </li>
    );
}

export default ModalItem;