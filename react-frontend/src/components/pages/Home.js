import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RequestTypeService from '../../services/RequestTypeService';
import RequestService from '../../services/RequestService';
import Modal from 'react-modal';
import Header from '../Header/Header';

Modal.setAppElement('#root');

const Home = () => {
  const navigate = useNavigate();
  const [requestTypes, setRequestTypes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchRequestTypes();
  }, []);

  const fetchRequestTypes = async () => {
    try {
      const response = await RequestTypeService.getRequestTypes();
      const types = response.data;

      const typesWithCounts = await Promise.all(
        types.map(async (type) => {
          const response = await RequestService.getRequestsByType(type.id);
          const requests = response.data;
          return { ...type, requests, count: requests.length };
        })
      );

      setRequestTypes(typesWithCounts);
    } catch (error) {
      console.error('Error fetching request types:', error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedType('');
    setFullName('');
    setEmail('');
    setDescription('');
  };

  const handleTypeClick = (typeId) => {
    navigate(`/requests/types/${typeId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = {
        requestTypeId: selectedType,
        fullName,
        email,
        description,
      };

      await RequestService.addRequest(request);
      closeModal();
      fetchRequestTypes();
    } catch (error) {
      console.error('Error adding request:', error);
    }
  };

  return (
    <div>
      <Header onOpen={setModalIsOpen} />
      <h2 className="flex justify-center text-3xl mt-2">Просмотр заявок</h2>
      {requestTypes.length > 0 ? (
        <ul>
          {requestTypes.map((type) => (
            <div className="content-req">
              <div className="items-info">
                <div className="request">
          <li key={type.id} onClick={() => handleTypeClick(type.id)}>
            <p className="text-3xl">{type.name}</p>
            <p className="text-m">{type.description}</p>            
          </li>
          </div>
          <div className="count-type">
            <p className="text-2xl">{type.count}</p>
            </div>
          </div>
          </div>
        ))}
        </ul>
      ) : (
        <div>
          <p className="nothing text-xl">У вас пока нет заявок<br />Если вы еще не создали типы заявок, то вам следует перейти 
          <Link to='/types' className='text-blue-500	'>по ссылке</Link>
            </p>
        </div>)
        }

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Добавить заявку</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Тип заявки:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              required
            >
              <option value="">Выберите тип заявки</option>
              {requestTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

          </div>
          <div>
            <label>ФИО:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Описание заявки:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Сохранить</button>
          <button type="button" onClick={closeModal}>
            Закрыть
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Home;