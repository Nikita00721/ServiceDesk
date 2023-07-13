import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RequestService from '../../services/RequestService';
import RequestTypeService from '../../services/RequestTypeService';


const RequestEdit = () => {
  const { id, requestTypeId } = useParams();
  const navigate = useNavigate();
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
    fetchRequest();
    fetchRequestTypes();
  }, [id]);

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
          <label>Тип заявки:</label>
          <span>{requestTypeName ? requestTypeName : '-'}</span>
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
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default RequestEdit;
