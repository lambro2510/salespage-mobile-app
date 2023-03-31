import axios from 'axios';
import { BASE_URL } from '../constants';
import {getErrorFromResponse, getAuthHeader} from '../utils';
const URL = 'https://salepage-server-rherm.appengine.bfcplatform.vn/';

const UserService = {
  async getProfile(token) {
    const response = await axios.get(BASE_URL + '/v1/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  
  async uploadImage(token, image) {
    const formData = new FormData();
    formData.append('image', image);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.post(
      BASE_URL + '/v1/api/user/uploadImage',
      formData,
      config
    );
    return response.data;
  },
};

export default UserService;
