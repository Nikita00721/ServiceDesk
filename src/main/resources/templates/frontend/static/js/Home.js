import React, { useEffect, useState } from 'react';

const Home = () => {
  const [requestTypes, setRequestTypes] = useState([]);

  useEffect(() => {
    // Fetch request types from the server
    fetch('/api/request-types')
      .then(response => response.json())
      .then(data => setRequestTypes(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Главная страница</h1>
      {/* Render request types */}
      {requestTypes.map(requestType => (
        <div key={requestType.id}>
          <h3>{requestType.name}</h3>
          <p>{requestType.description}</p>
          <p>Количество заявок: {requestType.requestSet.length}</p>
        </div>
      ))}
      {/* Add request form */}
      <form action="/api/requests" method="post">
        <div className="mb-3">
          <label htmlFor="requestTypeInput" className="form-label">
            Тип заявки
          </label>
          <select className="form-control" id="requestTypeInput" name="requestType">
            {requestTypes.map(requestType => (
              <option key={requestType.id} value={requestType.id}>
                {requestType.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="fullNameInput" className="form-label">
            Полное имя
          </label>
          <input type="text" className="form-control" id="fullNameInput" name="fullName" />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="emailInput" name="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="descriptionInput" className="form-label">
            Описание
          </label>
          <textarea className="form-control" id="descriptionInput" name="description"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default Home;
