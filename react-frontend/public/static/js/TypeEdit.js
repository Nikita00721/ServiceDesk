import React, { useState, useEffect } from 'react';

const TypeEdit = ({ match }) => {
  const typeId = match.params.id;
  const [type, setType] = useState({});

  useEffect(() => {
    // Fetch type details from the server
    fetch(`/api/types/${typeId}`)
      .then(response => response.json())
      .then(data => setType(data))
      .catch(error => console.error('Error:', error));
  }, [typeId]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform type update logic here
    // ...
  };

  return (
    <div>
      <h1>Редактирование типа</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="hidden" name="id" value={type.id} />
        <div>
          <label htmlFor="name">Название типа</label>
          <input type="text" name="name" value={type.name} className="form-control" />
        </div>
        <div>
          <label htmlFor="description">Описание</label>
          <input type="text" name="description" value={type.description} className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">Редактировать тип</button>
      </form>
    </div>
  );
};

export default TypeEdit;
