import axios from 'axios';
import { BASE_URL } from '../constants';
import { getErrorFromResponse, getAuthHeader } from '../utils';

const ProductTransactionService = {

  async getListTransactionHistory(filter, token) {
    try {
      const response = await axios.get(
        BASE_URL + `/v1/api/product-transaction?sellerUsername=${filter?.sellerUsername}&storeName=${filter?.storeName}&startDate=${filter?.startDate}&endDate=${filter?.endDate}&page=${filter?.page}&size=${filter?.size}&sort=${filter?.sort}`,
        getAuthHeader(token),
      );
      return response.data;
    } catch (error) {
      throw getErrorFromResponse(error);
    }
  },
  
  async createProductTransaction(productTransaction, token) {
    try {
      const response = await axios.post(
        BASE_URL + '/v1/api/product-transaction',
        {
          quantity: productTransaction.quantity,
          note: productTransaction.note,
          productId: productTransaction.productId,
          voucherCode: productTransaction.voucherCode,
          address: productTransaction.address

        },
        getAuthHeader(token),
      );
      return response.data;
    } catch (error) {
      getErrorFromResponse(error);
    }
  },

  async updateProductTransaction(productTransactionId, token) {
    try {
      const response = await axios.put(
        BASE_URL + '/v1/api/product-transaction',
        {
          transactionId: productTransactionId,
        },
        getAuthHeader(token),
      );
      return response.data;
    } catch (error) {
      getErrorFromResponse(error);
    }
  },

  async cancelProductTransaction(productTransactionId, token) {
    const response = await axios.put(
      BASE_URL + '/v1/api/product-transaction/cancel',
      {
        transactionId: productTransactionId,
      },
      getAuthHeader(token),
    );
    return response.data;
  },


};

export default ProductTransactionService;