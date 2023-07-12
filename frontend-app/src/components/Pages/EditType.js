import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Pages.css"

function EditType({ typeTitle, setTypeTitle, valueDesType, setValueDesType, isFormValidType,reqType,setReqType }) {
  const { index } = useParams();
  const editPageType = useNavigate()

  useEffect(() => {
    if ( reqType && index < reqType.length) {
      const { title, description } = reqType[index];
      setTypeTitle(title);
      setValueDesType(description);
    } 
  }, [index, reqType, editPageType, setTypeTitle, setValueDesType]);

  const handleSubmitEditType = (e) => {
    e.preventDefault();

    if (typeTitle.trim() === "" || valueDesType.trim() === "") {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const updatedRequests = [...reqType];
    updatedRequests[index] = {
      title: typeTitle,
      description: valueDesType,
    };

    setReqType(updatedRequests);

    editPageType("/working");
  };
  const handleCancel=()=>{
    editPageType("/working")
  }

  return (

    <div className="wrapper-page h-screen w-screen">
      <div className="edit-form">
        <form onSubmit={handleSubmitEditType}>
          <h2 className="text-2xl text-center">Редактировать тип заявки</h2>
          <div className="content">
            <label>Тип</label>
            <input type="text" placeholder="Введите тип" value={typeTitle}
              onChange={(e) => setTypeTitle(e.target.value)} />
          </div>
          <div className="content">
            <label>Описание</label>
            <input type="text" placeholder="Введите описание" value={valueDesType}
              onChange={(e) => setValueDesType(e.target.value)} maxLength={25} />
          </div>
          <div className="btn-mod">
            <input type="submit" className="sub" value="Сохранить" disabled={!isFormValidType} />
            <input onClick={handleCancel} type="button" className="cancel" value="Отмена" />
          </div>
          <div className="btn-mod">
          </div>

        </form>
      </div>
    </div>

  );
}

export default EditType;
