import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import RequestService from '../../services/RequestService';
import RequestTypeService from '../../services/RequestTypeService';
import Header from '../Header/Header';
import { AiOutlineDelete } from "react-icons/ai"
import { AiOutlineEdit } from "react-icons/ai"
import "./RequestByType.css"
import RequestEdit from '../Modals/RequestEdit';

const RequestByType = () => {
  const { typeId } = useParams();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [requestType, setRequestType] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null)


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

  const handleEdit = (id) => {
    setModalIsOpen(true)
    setSelectedRequestId(id)
  }
  const fetchRequestType = async () => {
    try {
      const response = await RequestTypeService.getType(typeId);
      setRequestType(response.data.name);
    } catch (error) {
      setError('Ошибка. Вернитесь на страницу и добавьте типы заявок');
    }
  };

  const handleUpdateSuccess = (updatedRequest) => {
    const updatedIndex = requests.findIndex((request) => request.id === updatedRequest.id);

    if (updatedIndex !== -1) {
      const updatedRequests = [...requests];
      updatedRequests[updatedIndex] = updatedRequest;
      setRequests(updatedRequests);
    }
  };


  const closeModal = () => {
    setModalIsOpen(false)
  }



  const handleDelete = async (id) => {
    try {
      const confirmed=window.confirm("Вы уверены,что хотите удалить эту заявку?")
      if(confirmed){
      await RequestService.deleteRequest(id);
      alert('Заявку успешно удалена');
      fetchRequests();
      }
      
    } catch (error) {
      alert('Ошибка при удалении заявки: ' + error);
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
                  <button className="icons edit" onClick={() => handleEdit(request.id)}>

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
        {modalIsOpen && (
          <RequestEdit
            requestId={selectedRequestId}
            closeModal={closeModal}
            requestData={requests.find((request) => request.id === selectedRequestId)}
            handleUpdateSuccess={handleUpdateSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default RequestByType;
