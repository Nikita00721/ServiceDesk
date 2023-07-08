import React from "react";

function ModalForm({
    handleSubmit,
    valueTitle,
    setValueTitle,
    valueDes,
    setValueDes,
    type,
    setType,
    isFormValid,
    editIndex,
    email,
    setEmail,
    emailError,
    titleError
}) {
    return (
        <div className="req">
            <form onSubmit={handleSubmit}>
                <div className="content">
                    <h2>ФИО</h2>
                    {titleError&&<p className="text-red-400 text-xs">{titleError}</p>}
                    <input type="text" placeholder="Введите полное имя" value={valueTitle} 
                    onChange={(e) => setValueTitle(e.target.value)}/>
                        
                </div>
                <div className="content">
                    <h2>Email</h2>
                    {emailError&&<p className="text-red-400 text-xs ">{emailError}</p>}
                    <input type="email" placeholder="Введите email" value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
                        
                </div>
                <div className="content">
                    <h2>Описание</h2>
                    <textarea type="text" placeholder="Описание" value={valueDes} 
                    onChange={(e) => setValueDes(e.target.value)} ></textarea>
                </div>
                <div className="content">
                    <h2>Тип заявки</h2>
                    <select value={type} onChange={(e) => setType(e.target.value)} >
                        <option></option>
                        <option>Электричество</option>
                        <option>Интернет</option>
                        <option>Другое</option>
                    </select>

                </div>

                <div className="btn-mod">
                    <button className="sub" type="submit" disabled={!isFormValid}>
                        {editIndex == -1 ? "Добавить" : "Сохранить"}
                    </button>

                </div>
            </form>
        </div>
    );
}

export default ModalForm;


