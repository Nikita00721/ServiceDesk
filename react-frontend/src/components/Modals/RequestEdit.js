import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RequestService from '../../services/RequestService';
import RequestTypeService from '../../services/RequestTypeService';
import { AiOutlineCloseCircle } from "react-icons/ai";



const RequestEdit = ({ closeModal, requestId, requestData, handleUpdateSuccess }) => {
  const { id, requestTypeId } = useParams();
  const [request, setRequest] = useState({
    fullName: '',
    email: '',
    description: '',
    requestType: null,
  });

  const [requestTypes, setRequestTypes] = useState([]);
  const [requestTypeName, setRequestTypeName] = useState('');
  const [selectedRequestType, setSelectedRequestType] = useState(null);


  useEffect(() => {
    if (requestData) {
      setRequest({
        fullName: requestData.fullName,
        email: requestData.email,
        description: requestData.description,
        requestType: requestData.requestType ? request.requestType : null,
      })
    }
    fetchRequest();
    fetchRequestTypes();
  }, [requestId], [id], [requestData]);

  const fetchRequest = async () => {
    try {
      const response = await RequestService.getRequest(id);
      setRequest(response.data);
      setSelectedRequestType(response.data.requestType);
    } catch (error) {
      console.error('Error fetching request:', error);
    }
  };

  const fetchRequestTypes = async () => {
    try {
      const response = await RequestTypeService.getRequestTypes();
      setRequestTypes(response.data);
      const selectedType = response.data.find((type) => type.id === parseInt(requestTypeId));
      console.log('requestTypeId:', requestTypeId);
      console.log('selectedType.id:', selectedType ? selectedType.id : null);
      if (selectedType) {
        setRequestTypeName(selectedType.name);
        setRequest((prevRequest) => ({
          ...prevRequest,
          requestType: selectedType.id,
        }));
      }
    } catch (error) {
      console.error('Error fetching request types:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'requestType') {
      const selectedType = requestTypes.find((type) => type.id === parseInt(value));

      setRequest((prevRequest) => ({
        ...prevRequest,
        requestType: selectedType ? selectedType.id : null,
      }));
    } else {
      setRequest((prevRequest) => ({
        ...prevRequest,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRequest = {
        ...requestData,
        fullName: request.fullName,
        email: request.email,
        description: request.description,
        requestType: request.requestType ? { id: request.requestType } : null,
      };
      await RequestService.updateRequest(updatedRequest);
      alert('Заявка успешно изменена');
      handleUpdateSuccess(updatedRequest)
      closeModal()
    } catch (error) {
      alert('Ошибка. Невозможно изменить заявку', error);
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
            <input
              type="text"
              name="fullName"
              value={request.fullName}
              onChange={handleChange}
            />
          </div>
          <div className='content'>
            <label>Email:</label>
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
          <div className='content'>
            <label>Тип заявки:</label>
            <select
              name="requestType"
              value={request.requestType || ''}
              onChange={handleChange}
            >
              {requestTypes.map((requestType) => (
                <option key={requestType.id} value={requestType.id}>
                  {requestType.name}
                </option>
              ))}
            </select>
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
