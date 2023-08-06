import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RequestService from '../../services/RequestService';
import RequestTypeService from '../../services/RequestTypeService';
import { AiOutlineCloseCircle } from "react-icons/ai";



const RequestEdit = ({ closeModal, requestId, requestData, handleUpdateSuccess}) => {
  const { id, requestTypeId } = useParams();
  const [request, setRequest] = useState({
    fullName: '',
    email: '',
    description: '',
    requestType: null,
  });

  const [requestTypes, setRequestTypes] = useState([]);
  const [requestTypeName, setRequestTypeName] = useState('');
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");


  useEffect(() => {
    if (requestData) {
      setRequest({
        fullName: requestData.fullName,
        email: requestData.email,
        description: requestData.description,
      })
    }
    fetchRequest();
    fetchRequestTypes();
  }, [requestId], [id], [requestData]);

  const fetchRequest = async () => {
    try {
      const response = await RequestService.getRequest(id);
      setRequest(response.data);
    } catch (error) {
      console.error('Error fetching request:', error);
    }
  };

  const fetchRequestTypes = async () => {
    try {
      const response = await RequestTypeService.getRequestTypes();
      setRequestTypes(response.data);
    } catch (error) {
      console.error('Error fetching request types:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

      setRequest((prevRequest) => ({
        ...prevRequest,
        [name]: value,
      }));
  };

  const validate = () => {
    const nameRegex = /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+$/;
const emailRegex=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!request.fullName || !nameRegex.test(request.fullName)) {
    setFullNameError("Введите корректное полное имя");
    return false;
    } else {
    setFullNameError("");
    }
    
    if (!request.email || !emailRegex.test(request.email)) {
    setEmailError("Введите корректный email");
    return false;
    } else {
    setEmailError("");
    }
    
    return true;
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validate()){
      try {
        const updatedRequest = {
          ...requestData,
          fullName: request.fullName,
          email: request.email,
          description: request.description,
        };
        await RequestService.updateRequest(updatedRequest);
        alert('Заявка успешно изменена');
        handleUpdateSuccess(updatedRequest)
        closeModal()
      } catch (error) {
        alert('Ошибка. Невозможно изменить заявку', error);
      }
    }
  };

  return (
    <div className="wrapper h-screen w-screen">
      <div className="modal border-double">
        <div className="btn-close">
          <AiOutlineCloseCircle
            onClick={closeModal}
            onKeyDown={closeModal}
            tabIndex={0}
            size={20}
            className="cursor-pointer" />
        </div>
        <h1 className="text-xl text-center text-black">Редактирование заявки</h1>
        <form onSubmit={handleSubmit}>
          <div className='content'>
            <label>Полное имя:</label>
            {fullNameError && <p className="text-xs text-rose-500">{fullNameError}</p>}
            <input
              type="text"
              name="fullName"
              value={request.fullName}
              onChange={handleChange}
            />
          </div>
          <div className='content'>
            <label>Email:</label>
            {emailError && <p className="text-xs text-rose-500">{emailError}</p>}
            <input
              type="email"
              name="email"
              value={request.email}
              onChange={handleChange}
            />
          </div>
          <div className='content'>
            <label>Описание:</label>
            <textarea
              name="description"
              value={request.description}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className="btn-mod">
            <button className='sub' type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestEdit;
