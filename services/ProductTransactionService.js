import axios from 'axios';

const URL = 'https://salepage-server-rherm.appengine.bfcplatform.vn';

const ProductTransactionService = {
  async createProductTransaction() {
    try {
      
      return products;
    } catch (error) {
      console.error(error);
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

export default ProductTransactionService;
