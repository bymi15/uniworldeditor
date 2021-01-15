import { axiosConfig } from "../config";

class BlobService {
  url = "/blobs";

  async get(container) {
    return (await axiosConfig.get(`${this.url}/${container}`)).data.blobs;
  }

  async upload(data, container) {
    return (await axiosConfig.post(`${this.url}/${container}`, data)).data.url;
  }
}

export default new BlobService();
