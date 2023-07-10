import React from "react";

function ModalTypeForm({
    handleSubmitType,
    valueDesType,
    setValueDesType,
    isFormValidType,
    typeTitleError,
    typeTitle,
    setTypeTitle

}) {
    return (
        <div className="req">
            <form onSubmit={handleSubmitType}>
                <div className="content">
                    <h2 className="text-black">Тип заявки</h2>
                    {typeTitleError&&<p className="text-red-400 text-xs">{typeTitleError}</p>}
                    <input type="text" placeholder="Введите тип заявки" value={typeTitle} 
                    onChange={(e) => setTypeTitle(e.target.value)}/>
                        
                </div>
                <div className="content">
                    <h2 className="text-black">Описание</h2>
                    <textarea type="text" placeholder="Описание" value={valueDesType} 
                    onChange={(e) => setValueDesType(e.target.value)} ></textarea>
                </div>

                <div className="btn-mod">
                    <button className="sub" type="submit" disabled={!isFormValidType}>
                        Добавить
                    </button>

                </div>
            </form>
        </div>
    );
}

export default ModalTypeForm;


