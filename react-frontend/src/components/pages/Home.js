import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RequestTypeService from '../../services/RequestTypeService';
import RequestService from '../../services/RequestService';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Home = () => {
  const navigate = useNavigate();
  const [requestTypes, setRequestTypes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
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
      <h1>Home</h1>
      <button>
        <Link to="/types">Работа с типами</Link>
      </button>
      <button onClick={openModal}>Добавить заявку</button>
      <ul>
        {requestTypes.map((type) => (
          <li key={type.id} onClick={() => handleTypeClick(type.id)}>
            <div>{type.name}</div>
            <p>{type.description}</p>
            <p>Количество заявок: {type.count}</p>
          </li>
        ))}
      </ul>

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