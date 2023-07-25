import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RequestTypeService from '../../services/RequestTypeService';
import RequestService from '../../services/RequestService';
import Modal from 'react-modal';
import Header from '../Header/Header';
import AddModal from '../Modals/AddModal'

Modal.setAppElement('#root');

const Home = ({handleEdit,handleFormSubmit,handleInputChange,handleInputUpdateChange}) => {
  const navigate = useNavigate();
  const [requestTypes, setRequestTypes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [fullName, setFullName] = useState('');
  const [updatedType, setUpdatedType] = useState();
  const [index, setIndex] = useState(-1);
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

  const closeModal = () => {
    setModalIsOpen(false);
    setIndex(-1);
    setSelectedType('');
    setFullName('');
    setEmail('');
    setDescription('');
    setUpdatedType(null)
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
          <li className="cursor-pointer" key={type.id} onClick={() => handleTypeClick(type.id)}>
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
          и нажать на кнопку "Добавить тип заявки"
            </p>
        </div>)
        }

      {modalIsOpen&&(
        <AddModal
        index={index}
        closeModal={closeModal}
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

export default Home;