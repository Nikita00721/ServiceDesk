import React, { useState, useEffect } from 'react';
import RequestTypeService from '../../services/RequestTypeService';
import Header from '../Header/Header';
import { AiOutlineDelete } from "react-icons/ai"
import { AiOutlineEdit } from "react-icons/ai"
import TypeModal from '../Modals/TypeModal';
import Filter from '../Filter/Filter';

const Types = (type) => {
  const [requestTypes, setRequestTypes] = useState([]);
  const [modalIsOpenType, setModalIsOpenType] = useState(false);
  const [index, setIndex] = useState(-1);
  const [newType, setNewType] = useState({
    name: '',
    description: '',
  });
  const [updatedType, setUpdatedType] = useState(type);
  const [sortBy, setSortBy] = useState(null);


  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    
    const sortedRequests = [...requestTypes];
    
    switch (sortOption) {
    case 'asc':
    sortedRequests.sort((a, b) => a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' }));
    break;
    case 'desc':
    sortedRequests.sort((a, b) => b.name.localeCompare(a.name, 'ru', { sensitivity: 'base' }));
    break;
    case 'all':
      fetchRequestTypes();
    break;
    default:
    break;
    }
    
    setRequestTypes(sortedRequests);
    };

  useEffect(() => {
    fetchRequestTypes();
  }, []);

  const fetchRequestTypes = async () => {
    try {
      const response = await RequestTypeService.getRequestTypes();
      setRequestTypes(response.data);
    } catch (error) {
      console.error('Ошибка при обновлении типа заявки: ' + error);
    }
  };

  const handleEdit = (type) => {
    setUpdatedType(type);
    setModalIsOpenType(true)
    setIndex(0)
  };
  const handleTypeUpdated = (updatedType) => {
    setRequestTypes((prevTypes) =>
      prevTypes.map((type) => (type.id === updatedType.id ? updatedType : type))
    );
    closeModal()
  };


  const closeModal = () => {
    setIndex(-1);
    setModalIsOpenType(false);
    setNewType({ name: '', description: '' });
    setUpdatedType(null);
  };

  const handleInputChange = (e) => {
    setNewType((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleInputUpdateChange = (e) => {
    setUpdatedType((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await RequestTypeService.updateType(updatedType.id, updatedType);
      alert('Тип успешно был добавлен');
      handleTypeUpdated(updatedType);
      closeModal();
    } catch (error) {
      alert('Ошибка при редактировании типа заявки: ' + error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RequestTypeService.addType(newType);
      closeModal();
      fetchRequestTypes(); // Обновление списка типов после успешного добавления
      setNewType({ name: '', description: '' }); // Сброс полей формы
    } catch (error) {
      alert('Ошибка при добавлении типа заявки: ' + error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed=window.confirm("Вы уверены,что хотите удалить эту заявку?")
      if(confirmed){
      await RequestTypeService.deleteType(id);
      alert('Заявку успешно удалена');
      fetchRequestTypes();
      }
    } catch (error) {
      alert('Невозможно удалить тип заявки. Удалите, пожалуйста, все заявки этого типа: ' + error);
    }
  };

  return (
    <div>

      <Header onOpen={setModalIsOpenType} setModalIsOpenType={setModalIsOpenType} />
      <h2 className="flex justify-center text-3xl mt-2">Типы заявок</h2>
      <Filter onSort={handleSort}></Filter>
      {requestTypes.length > 0 ? (
        <ul>
          {requestTypes.map((type) => (
            <div className="content-req">
              <div className="items-info">
                <div className="request">
                  <li key={type.id}>
                    <p className="text-3xl">{type.name}</p>
                    <p className="text-m">{type.description}</p>
                  </li>
                </div>
              </div>
              <div className="actions">
                <button className="icons edit" onClick={() => handleEdit(type)}>

                  <div className="tooltip">Редактировать</div>
                  <span><AiOutlineEdit className="icon" size={24}></AiOutlineEdit></span>

                </button>
                <button className="icons del" onClick={() => handleDelete(type.id)}><div className="tooltip">Удалить</div>
                  <span><AiOutlineDelete className="icon" size={24}></AiOutlineDelete></span></button>
              </div>
            </div>


          ))}
        </ul>
      ) : (
        <div>
          <p className="nothing text-xl">У вас пока нет заявок<br />Добавьте типы, пожалуйста</p>
        </div>
      )}
      {modalIsOpenType && (
        <TypeModal
          index={index}
          closeModal={closeModal}
          newType={newType}
          updatedType={updatedType}
          handleInputChange={handleInputChange}
          handleInputUpdateChange={handleInputUpdateChange}
          handleSubmit={handleSubmit}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Types;
