import axios from "../axiosConfig";

class EventRoomService {
  url = "/eventrooms";

  async getAll() {
    return (await axios.get(`${this.url}?showDetails=true`)).data;
  }

  async get(id) {
    return (await axios.get(`${this.url}/${id}`)).data;
  }

  async create(data) {
    return (await axios.post(this.url, data)).data;
  }

  async update(id, data) {
    return (await axios.put(`${this.url}/${id}`, data)).data;
  }

  async delete(id) {
    return await axios.delete(`${this.url}/${id}`);
  }
}

export default new EventRoomService();
