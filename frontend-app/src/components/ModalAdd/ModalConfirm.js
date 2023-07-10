import React from "react";

function ModalConfirmation({ setShowConfirm }) {
    const confirmDelete = () => {
        const confirmed = window.confirm("Вы уверены, что хотите удалить заявку?");
        if (confirmed) {
        }
        setShowConfirm(false);
    };

    return (
        <div className="">
            <div className="">
                <p>Вы уверены, что хотите удалить заявку?</p>
                <div>
                    <button onClick={() => setShowConfirm(false)}>Отмена</button>
                    <button type="button" onClick={confirmDelete}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmation;