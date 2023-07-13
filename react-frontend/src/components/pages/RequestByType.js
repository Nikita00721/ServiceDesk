import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import RequestService from '../../services/RequestService';
import RequestTypeService from '../../services/RequestTypeService';

const RequestByType = () => {
  const { typeId } = useParams();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestType, setRequestType] = useState('');

  useEffect(() => {
    fetchRequests();
    fetchRequestType();
  }, [typeId]);

  const fetchRequests = async () => {
    try {
      const typeIdNumber = parseInt(typeId, 10);
      if (Number.isNaN(typeIdNumber)) {
        setError('Invalid type ID');
        setIsLoading(false);
      } else {
        const response = await RequestService.getRequestsByType(typeIdNumber);
        setRequests(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      setError('Error fetching requests');
      setIsLoading(false);
    }
  };

  const fetchRequestType = async () => {
    try {
      const response = await RequestTypeService.getType(typeId);
      setRequestType(response.data.name);
    } catch (error) {
      setError('Error fetching request type');
    }
  };

  const handleDelete = async (id) => {
    try {
      await RequestService.deleteRequest(id);
      console.log('Request deleted successfully');
      fetchRequests();
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Заявки типа {requestType}</h1>
      <Link to="/">Назад</Link>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <div>
              <strong>Заявка ID:</strong> {request.id}
            </div>
            <div>
              <strong>Полное имя:</strong> {request.fullName}
            </div>
            <div>
              <strong>Email:</strong> {request.email}
            </div>
            <div>
              <strong>Описание:</strong> {request.description}
            </div>
            <div>
              <strong>Дата подачи:</strong>{' '}
              {new Date(request.submissionDate).toLocaleDateString()}
            </div>
            <div>
              <strong>Время подачи:</strong>{' '}
              {new Date(request.submissionDate).toLocaleTimeString()}
            </div>
            <div>
              <button onClick={() => handleDelete(request.id)}>Удалить</button>
<Link to={`/request-edit/${request.requestTypeId}/${request.id}`}>Редактировать</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestByType;
