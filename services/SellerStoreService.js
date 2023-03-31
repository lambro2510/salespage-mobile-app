import axios from 'axios';
import { BASE_URL } from '../constants';
import {getErrorFromResponse, getAuthHeader} from '../utils';
const URL = 'https://salepage-server-rherm.appengine.bfcplatform.vn';

const SellerStoreService = {
  async getStoreByUsername(username) {
    try {
      const store = await axios.get()
      return store;
    } catch (error) {
      getErrorFromResponse(error);
      return [];
    }
  },

  async updateProductTransaction() {
    const response = await axios.post(URL + 'v1/api/account/sign-up', {});
    return response.data;
  },

  async cancelProductTransaction() {
    const response = await axios.post(
      URL + 'v1/api/account/verify',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data;
  },
};

export default SellerStoreService;
