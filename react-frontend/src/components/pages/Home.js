import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RequestTypeService from '../../services/RequestTypeService';
import Modal from 'react-modal';

const Home = () => {
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
      setRequestTypes(response.data);
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
    // Дополнительная логика при клике на тип заявки
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = {
        requestType: selectedType,
        fullName,
        email,
        description,
      };

      // Отправка запроса на добавление заявки
      // Используйте соответствующий метод из RequestService
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
            <Link to={`/requests/${type.id}`}>{type.name}</Link>
            <p>{type.description}</p>
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
