import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RequestTypeService from '../../services/RequestTypeService';

const TypeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [type, setType] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchType();
  }, []);

  const fetchType = async () => {
    try {
      const response = await RequestTypeService.getType(id);
      setType(response.data);
      setIsLoading(false);
    } catch (error) {
      setError('Error fetching type details');
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const updatedType = {
      id: type.id,
      name: event.target.name.value,
      description: event.target.description.value,
    };

    try {
      await RequestTypeService.updateType(id, updatedType);
      console.log('Type updated successfully');
      navigate('/types'); // Перенаправление на страницу "Types.js"
    } catch (error) {
      console.error('Error updating type:', error);
      // Дополнительная логика или вывод сообщения об ошибке
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
      <h1>Редактирование типа</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="hidden" name="id" value={type.id} />
        <div>
          <label htmlFor="name">Название типа</label>
          <input type="text" name="name" defaultValue={type.name} className="form-control" />
        </div>
        <div>
          <label htmlFor="description">Описание</label>
          <input type="text" name="description" defaultValue={type.description} className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">Редактировать тип</button>
      </form>
    </div>
  );
};

export default TypeEdit;
