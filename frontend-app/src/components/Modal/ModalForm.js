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
    handleAdd,
    editIndex,
    isEditModal
}) {
    return (
        <div className="req">
            <form onSubmit={handleSubmit}>
                <div className="content">
                    <h2>ФИО</h2>
                    <input type="text" placeholder="Введите полное имя" value={valueTitle} onChange={(e) => setValueTitle(e.target.value)} />
                </div>
                <div className="content">
                    <h2>Email</h2>
                    <input type="text" placeholder="Введите email" value={valueTitle} onChange={(e) => setValueTitle(e.target.value)} />
                </div>
                <div className="content">
                    <h2>Описание</h2>
                    <textarea type="text" placeholder="Описание" value={valueDes} onChange={(e) => setValueDes(e.target.value)}></textarea>
                </div>
                <div className="content">
                    <h2>Тип заявки</h2>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option></option>
                        <option>Электричество</option>
                        <option>Интернет</option>
                        <option>Другое</option>
                    </select>

                </div>
                <div className="btns-mod">
                    <button className="sub" type="submit" disabled={!isFormValid}>
                        {editIndex ==-1 ? "Добавить" : "Сохранить"}
                    </button>
                    {!isEditModal && !editIndex && (
                        <button className="cancel" onClick={handleAdd} onKeyDown={handleAdd} tabIndex={0} role="button">
                            Отмена
                        </button>
                    )}

                </div>
            </form>
        </div>
    );
}

export default ModalForm;

