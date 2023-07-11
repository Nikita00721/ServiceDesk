import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RequestTypeService from '../../services/RequestTypeService';
import Modal from 'react-modal';

const Types = () => {
  const [requestTypes, setRequestTypes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newType, setNewType] = useState({
    name: '',
    description: '',
  });

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
    setNewType({ name: '', description: '' });
  };

  const handleInputChange = (e) => {
    setNewType({ ...newType, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await RequestTypeService.addType(newType);
      closeModal();
      fetchRequestTypes();
    } catch (error) {
      console.error('Error adding request type:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await RequestTypeService.deleteType(id);
      fetchRequestTypes();
    } catch (error) {
      console.error('Error deleting request type:', error);
    }
  };

  return (
    <div>
      <h1>Типы заявок</h1>
      <button>
        <Link to="/">Главная</Link>
      </button>
      <button onClick={openModal}>Добавить тип</button>
      <ul>
        {requestTypes.map((type) => (
          <li key={type.id}>
            <p>Название: {type.name}</p>
            <p>Описание: {type.description}</p>
            <button>
              <Link to={`/types/${type.id}/edit`}>Редактировать</Link>
            </button>
            <button onClick={() => handleDelete(type.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Добавить тип заявки</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Название:</label>
            <input
              type="text"
              name="name"
              value={newType.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Описание:</label>
            <textarea
              name="description"
              value={newType.description}
              onChange={handleInputChange}
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

export default Types;
