import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from 'react';


const TypeModal = ({ index,
  closeModal,
  newType,
  updatedType,
  handleInputChange,
  handleInputUpdateChange,
  handleSubmit,
  handleFormSubmit,

}) => {
  const [nameError, setNameError] = useState("");
const nameRegex = /^[a-zA-Zа-яА-Я\s]+$/;
const validateInput = () => {
if (!newType.name || !nameRegex.test(newType.name)) {
setNameError("Введите корректное название");
return false;
}

setNameError("");
return true;
};
const validateInputUpdate = () => {
  if (!updatedType.name || !nameRegex.test(updatedType.name)) {
  setNameError("Введите корректное название");
  return false;
  }
  
  setNameError("");
  return true;
  };

const handleAddSubmit = (e) => {
e.preventDefault();
if (validateInput(newType)) {
handleSubmit(e);
}
};

const handleUpdateSubmit = (e) => {
e.preventDefault();
if (validateInputUpdate(updatedType)) {
handleFormSubmit(e);
}
};


  return (
    <div className="wrapper h-screen w-screen">
      <div className="modal border-double">
        <div
          className="btn-close"
          onClick={closeModal}
          onKeyDown={closeModal}
          tabIndex={0}
        >
          <AiOutlineCloseCircle size={20} className="cursor-pointer" />
        </div>
        {
          index == -1 ? (
            <div>
              <h1 className="text-xl text-center text-black">Добавить тип заявки</h1>
              <div className="req">
                <form onSubmit={handleAddSubmit}>
                  <div className="content">
                    <label>Название:</label>
                    {nameError && <p className="text-xs text-rose-500">{nameError}</p>}
                    <input
                      type="text"
                      name="name"
                      value={newType.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="content">
                    <label>Описание:</label>
                    <textarea
                      name="description"
                      value={newType.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="btn-mod">
                    <button className="sub" type="submit">
                      Добавить
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-xl text-center text-black">Редактирование типа</h1>
              <div className="req">
                <form onSubmit={handleUpdateSubmit}>
                  <div className="content">
                    <label>Название:</label>
                    {nameError && <p className="text-xs text-rose-500">{nameError}</p>}
                    <input
                      type="text"
                      name="name"
                      value={updatedType.name}
                      onChange={handleInputUpdateChange}
                      required
                    />
                  </div>
                  <div className="content">
                    <label>Описание:</label>
                    <textarea
                      name="description"
                      value={updatedType.description}
                      onChange={handleInputUpdateChange}
                      required
                    ></textarea>
                  </div>
                  <div className="btn-mod">
                    <button className="sub" type="submit">
                      Сохранить
                    </button>
                  </div>
                </form>
              </div>
            </div>)}

      </div>
    </div>
  )

}
export default TypeModal