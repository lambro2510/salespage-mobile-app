import axios from 'axios';
import {getErrorFromResponse, getAuthHeader} from '../utils';
import { BASE_URL } from '../constants';

const ProductService = {
  async getAllProducts(searchInfo) {
    try {
      const response = await axios.get(BASE_URL + '/v1/api/public/product', {
        params: {
          page: searchInfo?.page,
          size: searchInfo?.pageSize,
          productType: searchInfo?.productType,
          productName: searchInfo?.productName,
          minPrice: searchInfo?.minPrice,
          maxPrice: searchInfo?.maxPrice,
          storeName: searchInfo?.storeName,
          username: searchInfo?.username,
        },
      });
      return response.data;
    } catch (error) {
      getErrorFromResponse(error);
      return [];
    }
  },

  async getProductDetail(productId) {
    try {
      const response = await axios.get(
        BASE_URL + '/v1/api/public/product/detail?productId=' + productId,
        {}
      );
      return response.data;
    } catch (error) {
      getErrorFromResponse(error);
      return null;
    }
  },
};

export default ProductService;
