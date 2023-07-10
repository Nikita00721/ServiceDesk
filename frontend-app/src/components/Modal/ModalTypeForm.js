import React from "react";

function ModalTypeForm({
    handleSubmit,
    valueDes,
    setValueDes,
    isFormValid,
    typeTitleError,
    typeTitle,
    setTypeTitle

}) {
    return (
        <div className="req">
            <form onSubmit={handleSubmit}>
                <div className="content">
                    <h2 className="text-black">Тип заявки</h2>
                    {typeTitleError&&<p className="text-red-400 text-xs">{typeTitleError}</p>}
                    <input type="text" placeholder="Введите тип заявки" value={typeTitle} 
                    onChange={(e) => setTypeTitle(e.target.value)}/>
                        
                </div>
                <div className="content">
                    <h2 className="text-black">Описание</h2>
                    <textarea type="text" placeholder="Описание" value={valueDes} 
                    onChange={(e) => setValueDes(e.target.value)} ></textarea>
                </div>

                <div className="btn-mod">
                    <button className="sub" type="submit" disabled={!isFormValid}>
                        Добавить
                    </button>

                </div>
            </form>
        </div>
    );
}

export default ModalTypeForm;


