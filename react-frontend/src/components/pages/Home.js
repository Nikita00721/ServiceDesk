import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RequestTypeService from '../../services/RequestTypeService';
import RequestService from '../../services/RequestService';
import Header from '../Header/Header';
import AddModal from '../Modals/AddModal'
import Filter from '../Filter/Filter';


const Home = (type) => {
  const navigate = useNavigate();
  const [requestTypes, setRequestTypes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
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
    // case 'all':
    //   setSortBy(null)
    // break;
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
      <Filter onSort={handleSort}></Filter>
      {requestTypes.length > 0 ? (
        <ul>
          {requestTypes.map((type) => (
            <div className="content-req">
              <div className="items-info">
                <div className="request">
                  <li className="cursor-pointer" key={type.id} onClick={() => handleTypeClick(type.id)}>
                    <p className="text-3xl">{type.name}</p>
                    <p className="text-m descrip">{type.description}</p>
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

      {modalIsOpen && (
        <AddModal
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          email={email}
          setEmail={setEmail}
          description={description}
          setDescription={setDescription}
          fullName={fullName}
          setFullName={setFullName}
          requestTypes={requestTypes}
        />
      )}
    </div>
  );
};

export default Home;