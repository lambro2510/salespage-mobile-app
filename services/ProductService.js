import axios from 'axios';

const URL = 'https://salepage-server-rherm.appengine.bfcplatform.vn';

const ProductService = {
  async getAllProducts(page , size, productType, minPrice, maxPrice ) {
    try {
      const response = await axios.get(URL + '/v1/api/public/product' + `?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getProductDetail(
    username,
    password,
    confirmPassword,
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth
  ) {
    const response = await axios.post(URL + 'v1/api/account/sign-up', {});
    return response.data;
  },

  async createNewProduct(token, code) {
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

export default ProductService;
