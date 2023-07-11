import React, { useEffect, useState } from 'react';

const Home = () => {
  const [reqtypes, setReqtypes] = useState([]);

  useEffect(() => {
    // Fetch request types from the server
    fetch('/api/types')
      .then(response => response.json())
      .then(data => setReqtypes(data))
      .catch(error => console.error('Error:', error));
  }, []);

 return (
    <div>
      <h1>Главная страница</h1>
      {/* Render request types */}
      {reqtypes.map(reqtype => (
        <div key={reqtype.id} className="alert alert-info mt-2">
          <div>
            <h3>{reqtype.name}</h3>
            <p>{reqtype.description}</p>
            <p>Количество заявок: {reqtype.requestSet.length}</p>
          </div>
        </div>
      ))}
      {/* Add request form */}
      <button
        type="button"
        className="btn btn-primary mt-3"
        data-bs-toggle="modal"
        data-bs-target="#addRequestModal"
      >
        Добавить заявку
      </button>
      {/* Add request modal */}
      <div className="modal fade" id="addRequestModal" tabIndex="-1" aria-labelledby="addRequestModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addRequestModalLabel">Добавить заявку</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="/api/requests" method="post">
                <div className="mb-3">
                  <label htmlFor="requestTypeInput" className="form-label">Тип заявки</label>
                  <select className="form-control" id="requestTypeInput" name="requestType">
                    {reqtypes.map(reqtype => (
                      <option key={reqtype.id} value={reqtype.id}>
                        {reqtype.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="fullNameInput" className="form-label">Полное имя</label>
                  <input type="text" className="form-control" id="fullNameInput" name="fullName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">Email</label>
                  <input type="email" className="form-control" id="emailInput" name="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="descriptionInput" className="form-label">Описание</label>
                  <textarea className="form-control" id="descriptionInput" name="description"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Сохранить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
