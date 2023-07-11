import axios from 'axios';

const baseURL = 'http://localhost:8082';

class RequestTypeService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${baseURL}/api/types`,
    });
  }

  getRequestTypes() {
    return this.axiosInstance.get('/');
  }

  addType(requestType) {
    return this.axiosInstance.post('/', requestType);
  }

  deleteType(id) {
    return this.axiosInstance.delete(`/${id}`);
  }

  updateType(id, updatedRequestType) {
    return this.axiosInstance.put(`/${id}`, updatedRequestType);
  }
}

export default new RequestTypeService();
