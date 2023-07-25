import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import RequestService from '../../services/RequestService';
import RequestTypeService from '../../services/RequestTypeService';
import Header from '../Header/Header';
import { AiOutlineDelete } from "react-icons/ai"
import { AiOutlineEdit } from "react-icons/ai"
import "./RequestByType.css"

const RequestByType = () => {
  const { typeId } = useParams();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const page=useNavigate()
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
      setError('Ошибка. Вернитесь на страницу и добавьте заявки');
      setIsLoading(false);
    }
  };

  const fetchRequestType = async () => {
    try {
      const response = await RequestTypeService.getType(typeId);
      setRequestType(response.data.name);
    } catch (error) {
      setError('Ошибка.Вернитесь на страницу и добавьте типы заявок');
    }
  };
  const backPage=()=>{
    page("/")
  }
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
    return <div>{error}</div>
  }

  return (
    <div>
       <Header />
       <h2 className="flex justify-center text-3xl mt-2">Ваши заявки типа {requestType}</h2>
      <div>
      {requests.length > 0 ? (
      <ul>
        {requests.map((request) => (
          <div className="content-req">
          <div className="items-info">
            <div className="request">
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
          </li>
          </div>
              </div>
              <div className="actions">
                <button className="icons edit" >

                  <div className="tooltip">Редактировать</div>
                  <span><AiOutlineEdit className="icon" size={24}></AiOutlineEdit></span>

                </button>
                <button className="icons del" onClick={() => handleDelete(request.id)}><div className="tooltip">Удалить</div>
                  <span><AiOutlineDelete className="icon" size={24}></AiOutlineDelete></span></button>
              </div>
              </div>
        ))}
      </ul>) : (
        <div>
          <p className="nothing text-xl">У вас пока нет заявок<br />Если вы еще не создали заявки, то вам следует перейти 
          <Link to='/' className='text-blue-500	'>по ссылке</Link>
          и нажать на кнопку "Добавить заявку"
            </p>
        </div>)
        }
      </div>
    </div>
  );
};

export default RequestByType;
