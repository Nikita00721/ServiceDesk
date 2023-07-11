import React, { useEffect, useState } from 'react';

const Types = () => {
  const [reqtypes, setReqtypes] = useState([]);

  useEffect(() => {
    // Fetch request types from the server
    fetch('/api/types')
      .then(response => response.json())
      .then(data => setReqtypes(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleDeleteType = (typeId) => {
    // Perform type deletion logic here
    // ...
  };

  return (
    <div>
      <h1>Типы заявок</h1>
      <button
        type="button"
        className="btn btn-primary mt-3"
        data-bs-toggle="modal"
        data-bs-target="#addRequestTypeModal"
      >
        Добавить тип
      </button>
      <a href="/" className="link">Главная</a>
      <div className="container mt-5">
        {reqtypes.map(reqtype => (
          <div key={reqtype.id} className="alert alert-info mt-2">
            <h3>{reqtype.name}</h3>
            <p>{reqtype.description}</p>
            <a href={`/${reqtype.id}/type-edit`} className="btn btn-warning">Редактировать</a><br />
            <form onSubmit={() => handleDeleteType(reqtype.id)}>
              <button type="submit">Удалить</button>
            </form>
          </div>
        ))}
      </div>
      <div className="modal fade" id="addRequestTypeModal" tabIndex="-1" aria-labelledby="addRequestTypeModalLabel" aria-hidden="true">
        {/* Add request type modal */}
      </div>
    </div>
  );
};

export default Types;
