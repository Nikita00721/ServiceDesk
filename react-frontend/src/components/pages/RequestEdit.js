import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RequestService from '../../services/RequestService';
import RequestTypeService from '../../services/RequestTypeService';

const RequestEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    fullName: '',
    email: '',
    description: '',
    requestType: null, // Изменено значение по умолчанию на null
  });
  const [requestTypes, setRequestTypes] = useState([]);

  useEffect(() => {
    fetchRequest();
    fetchRequestTypes();
  }, [id]);

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
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RequestService.updateRequest(request);
      console.log('Request updated successfully');
      navigate(`/requests/types/${request.requestType}`);
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  return (
    <div>
      <h1>Редактирование заявки</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Полное имя:</label>
          <input
            type="text"
            name="fullName"
            value={request.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={request.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Описание:</label>
          <textarea
            name="description"
            value={request.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Тип заявки:</label>
          <select
            name="requestType"
            value={request.requestType || ''} // Добавлено преобразование null в пустую строку
            onChange={handleChange}
          >
            <option value="">Выберите тип заявки</option>
            {requestTypes.map((requestType) => (
              <option
                key={requestType.id}
                value={requestType.id}
              >
                {requestType.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default RequestEdit;
