import React,{useState} from "react";
import {AiOutlineCloseCircle} from "react-icons/ai"
import "./Modal.css"


function Modal({modal,setModal}) {
    const [valueTitle,setValueTitle]=useState('')
    const [valueDes,setValueDes]=useState('')
    const [type,setType]=useState([])
    const [req,setReq]=useState([])


      const addSubmit=(e)=>{
        e.preventDefault()
       const newReq={
        id: new Date().getTime,
        title:valueTitle,
        description:valueDes,
        type:type,
       }
       setReq([...req,newReq])
       setType('')
       setValueTitle('')
       setValueDes('')
       setModal(false)
    }


    const isFormValid = valueTitle.trim()!==''&&valueDes.trim()!==''&&type!==''
    const countType=(selectedType)=>{
      return req.filter((request)=>request.type==selectedType).length
    }

    return (
        <div>
            <button onClick={(e)=>setModal(true)}>Добавить заявку</button>
      <div>
        <h2>Информация о заявке</h2>
        {req.length > 0 ? (
          <ul>
            {
              req.map((request)=>(
                <li key={request.id}>
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
                </li>
                
              ))
            }
          </ul>
        ):
        (<p>У вас пока нет заявок</p>)}
      </div>
      <div>
        <h2>Количество заявок по типа:</h2>
        <p>Электричество:{countType("Электричество")}</p>
        <p>Интернет:{countType("Интернет")}</p>
        <p>др.:{countType("др.")}</p>
      </div>


            {modal &&(
      <div className="wrapper h-screen w-screen">
        <div className="modal">
        <h1>Добавить заявку</h1>
        <div className="btn-close" onClick={()=>setModal(false)} onKeyDown={()=>setModal(false)} tabIndex={0} role="button">
        <AiOutlineCloseCircle />
        </div>
        <form onSubmit={addSubmit}>
            <div>
                <h1>Заголовок</h1>
                <input type="text" value={valueTitle} onChange={(e)=>setValueTitle(e.target.value)} />
                </div>
                <div>
                <h1>Описание</h1>
                <input type="text" value={valueDes} onChange={(e)=>setValueDes(e.target.value)} />
                </div>
                <div>
                <h1>Тип заявки</h1>
                <select value={type} onChange={(e)=>setType(e.target.value)}>
                    <option></option>
                    <option>Электричество</option>
                    <option>Интернет</option>
                    <option>др.</option>
                </select>
                </div>
                <div>
                    <button type="submit" disabled={!isFormValid}>Добавить</button>
                    <button onClick={()=>setModal(false)} onKeyDown={()=>setModal(false)} tabIndex={0} role="button">Отмена</button>
                </div>
        </form>
        </div>
      </div> 
      )}
      </div>
    );
  }
  
  export default Modal;
  