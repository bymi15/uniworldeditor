import { axiosConfig } from "../config";

class BlobService {
  url = "/blobs";

  async get(container) {
    return (await axiosConfig.get(`${this.url}/${container}`)).data.blobs;
  }

  async upload(data, container) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return (await axiosConfig.post(`${this.url}/${container}`, data, config)).data.url;
  }
}

export default new BlobService();
