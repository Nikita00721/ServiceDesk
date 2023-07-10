import React, { useEffect, useState } from 'react';

const RequestByType = ({ match }) => {
  const requestTypeId = match.params.id;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests by type from the server
    fetch(`/api/types/${requestTypeId}`)
      .then(response => response.json())
      .then(data => setRequests(data))
      .catch(error => console.error('Error:', error));
  }, [requestTypeId]);

  const handleDeleteRequest = (requestId) => {
    // Perform request deletion logic here
    // ...
  };

  return (
    <div>
      <h1>Заявки</h1>
      <div className="container mt-5">
        {requests.map(request => (
          <div key={request.id} className="alert alert-info mt-2">
            <h3>{request.fullName}</h3>
<p>{request.email}</p>
            <p>{request.submissionDate}</p>
            <p>{request.description}</p>
            <form onSubmit={() => handleDeleteRequest(request.id)}>
              <button type="submit" className="btn btn-danger">Удалить</button>
            </form>
            <a href={`/request-edit/${request.id}`} className="btn btn-primary">Редактировать</a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RequestByType;