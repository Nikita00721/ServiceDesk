import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Pages.css"

function EditReq({ isFormValid,reqType,setReqType }) {
  

  return (

    <div className="wrapper-page h-screen w-screen">
      <div className="edit-form">
        <form>
          <h2 className="text-2xl text-center">Редактировать тип заявки</h2>
          <div className="content">
            <label>ФИО</label>
            <input type="text" placeholder="Введите тип" />
          </div>
          <div className="content">
            <label>Email</label>
            <input type="text" placeholder="Введите тип"  />
          </div>
          <div className="content">
            <label>Описание</label>
            <input type="text" placeholder="Введите описание" />
          </div>
          <div className="content">
            <label>Тип</label>
            <input type="text" placeholder="Введите тип"  />
          </div>
          <div className="btn-mod">
            <input type="submit" className="sub" value="Сохранить" disabled={!isFormValid} />
            <input onClick={handleCancel} type="button" className="cancel" value="Отмена" />
          </div>
          <div className="btn-mod">
          </div>

        </form>
      </div>
    </div>

  );
}

export default EditReq;
