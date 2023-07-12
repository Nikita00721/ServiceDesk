import axios from 'axios';
const baseURL = 'http://localhost:8082';

class RequestService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${baseURL}/api/requests`,
    });
  }

  addRequest(request) {
    return this.axiosInstance.post('/add', request);
  }

    getRequestsByType(requestTypeId) {
      return this.axiosInstance.get(`/type/${requestTypeId}`);
    }


  deleteRequest(id) {
    return this.axiosInstance.delete(`/${id}`);
  }

  updateRequest(updatedRequest) {
    return this.axiosInstance.put('/update', updatedRequest);
  }
}

export default new RequestService();

