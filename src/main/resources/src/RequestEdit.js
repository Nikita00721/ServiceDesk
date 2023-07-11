import React, { useState, useEffect } from 'react';

const RequestEdit = ({ match }) => {
  const requestId = match.params.id;
  const [request, setRequest] = useState({});
  const [reqtypes, setReqtypes] = useState([]);

  useEffect(() => {
    // Fetch request details from the server
    fetch(`/api/requests/${requestId}`)
      .then(response => response.json())
      .then(data => setRequest(data))
      .catch(error => console.error('Error:', error));

    // Fetch request types from the server
    fetch('/api/types')
      .then(response => response.json())
      .then(data => setReqtypes(data))
      .catch(error => console.error('Error:', error));
  }, [requestId]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform request update logic here
    // ...
  };

  return (
    <div>
      <h1>Редактирование заявки</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="hidden" name="id" value={request.id} />
        <div>
          <label htmlFor="requestType">Тип заявки</label>
          <select id="requestType" name="requestType">
            {reqtypes.map(reqtype => (
              <option
                key={reqtype.id}
                value={reqtype.id}
                selected={reqtype.id === request.requestType?.id}
              >
                {reqtype.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fullName">Имя</label>
          <input type="text" id="fullName" name="fullName" value={request.fullName} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={request.email} />
        </div>
        <div>
          <label htmlFor="description">Описание</label>
          <textarea id="description" name="description" value={request.description}></textarea>
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default RequestEdit;
