import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from 'react';


const AddModal = ({
  closeModal,
  handleSubmit,
  selectedType,
  setSelectedType,
  email,
  setEmail,
  description,
  setDescription,
  fullName,
  setFullName,
  requestTypes

}) => {

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");

const validate = () => {
const nameRegex = /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+$/;
const emailRegex=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
if (!fullName || !nameRegex.test(fullName)) {
setFullNameError("Введите корректное ФИО");
return false;
}

if(!email||!emailRegex.test(email)){
  setEmailError("Введите корректную эл.почту");
  return false;
}
return true;
};

const handleSubmitForm = (e) => {
  e.preventDefault();
  setEmailError("")
  setFullNameError("");
  if (validate()) {
  handleSubmit(e);
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
        <h1 className="text-xl text-center text-black">Добавить заявку</h1>
        <div className="req">
          <form onSubmit={handleSubmitForm}>
            <div className='content'>
              <label>Тип заявки:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                required
              >
                <option value="">Выберите тип заявки</option>
                {requestTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>

            </div>
            <div className='content'>
              <label>ФИО:</label>
              {fullNameError && <p className="text-xs text-rose-500">{fullNameError}</p>}
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Введите ФИО"
                required
              />
            </div>
            <div className='content'>
              <label>Email:</label>
              {emailError && <p className="text-xs text-rose-500">{emailError}</p>}
              <input
                type="email"
                value={email}
                placeholder="Введите email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='content'>
              <label>Описание</label>
              <textarea
                value={description}
                placeholder="Введите описание"
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="btn-mod">
              <button className='sub' type="submit">Добавить</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )

}
export default AddModal