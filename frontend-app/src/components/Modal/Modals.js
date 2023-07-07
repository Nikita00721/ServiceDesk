import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai"
import "./Modal.css"


function Modal({ modal, setModal }) {
  const [valueTitle, setValueTitle] = useState('')
  const [valueDes, setValueDes] = useState('')
  const [type, setType] = useState([])
  const [req, setReq] = useState([])
  const [editIndex, setEditIndex] = useState(-1);
  const [showConfirm, setShowConfirm] = useState(false);

  const isFormValid = valueTitle !== '' && valueDes !== '' && type !== ''
  const countType = (selectedType) => {
    return req.filter((request) => request.type == selectedType).length
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const newReq = {
      title: valueTitle,
      description: valueDes,
      type: type,
    };

    if (editIndex !== -1) {
      const updatedReq = [...req];
      updatedReq[editIndex] = newReq;
      setReq(updatedReq);
      setEditIndex(-1);
    } else {
      setReq([...req, newReq]);
    }
    setValueTitle("");
    setValueDes("");
    setType("")
  }
 
  const handleEdit = (index) => {
    const { title, description, type } = req[index];
    setValueTitle(title);
    setValueDes(description);
    setType(type);
    setEditIndex(index);
    setModal(true);
  };

  const handleDelete = (index) => {
    setShowConfirm(true);
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить заявку?");
    if (confirmDelete) {
      const updatedReq = [...req];
      updatedReq.splice(index, 1);
      setReq(updatedReq);
    }
    setShowConfirm(false);
  };


  return (
    <div>
      <button onClick={(e) => setModal(true)}>Добавить заявку</button>
      <div>
        <h2>Информация о заявке</h2>
        {req.length > 0 ? (
          <ul>
            {
              req.map((request, index) => (
                <li key={index}>
                  <div>
                    <h3>Заголовок</h3>
                    <p>Описание</p>
                    <p>Тип</p>
                  </div>
                  <div>
                    <p>{request.title}</p>
                    <p>{request.description}</p>
                    <p>{request.type}</p>
                  </div>
                  <div>
                    <button onClick={() => handleEdit(index)}>Редактировать</button>
                    <button onClick={() => handleDelete(index)}>Удалить</button>
                  </div>
                </li>

              ))
            }
          </ul>
        ) :
          (<p>У вас пока нет заявок</p>)}
      </div>
      <div>
        <h2>Количество заявок по типа:</h2>
        <p>Электричество:{countType("Электричество")}</p>
        <p>Интернет:{countType("Интернет")}</p>
        <p>др.:{countType("др.")}</p>
      </div>


      {showConfirm && (
        <div className="">
          <div className="">
            <p>Вы уверены, что хотите удалить заявку?</p>
            <div>
              <button onClick={() => setShowConfirm(false)}>Отмена</button>
              <button type="button">Удалить</button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className="wrapper h-screen w-screen">
          <div className="modal border-double">
          <div className="btn-close" onClick={() => setModal(false)} onKeyDown={() => setModal(false)} tabIndex={0} role="button">
              <AiOutlineCloseCircle size={20} />
            </div>
            
            <h1 className="text-xl text-center">{editIndex !== -1 ? "Редактировать заявку" : "Добавить заявку"}</h1>
            <div className="req">            
            <form onSubmit={handleSubmit}>
              <div className="content">
                <h2>Заголовок</h2>
                <input type="text" value={valueTitle} onChange={(e) => setValueTitle(e.target.value)} />
              </div>
              <div className="content">
                <h2>Описание</h2>
                <textarea type="text" value={valueDes} onChange={(e) => setValueDes(e.target.value)}></textarea>
              </div>
              <div className="content">
                <h2>Тип заявки</h2>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option></option>
                  <option>Электричество</option>
                  <option>Интернет</option>
                  <option>др.</option>
                </select>
              </div>
              <div className="btns-mod">
                <button className="sub" type="submit" disabled={!isFormValid} >{editIndex !== -1 ? "Редактировать" : "Добавить"}</button>
                <button className="cancel" onClick={() => setModal(false)} onKeyDown={() => setModal(false)} tabIndex={0} role="button">Отмена</button>
              </div>
            </form>
            </div>
            
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Modal;
