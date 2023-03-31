import axios from 'axios';
import {getErrorFromResponse} from '../utils';
import {BASE_URL} from '../constants'

const AccountService = {
  async signIn(username, password) {
   try{
      const response = await axios.post(BASE_URL + '/v1/api/account/sign-in', {
      username: username,
      password: password,
    });
    return response.data;
   }catch(error){
      getErrorFromResponse(error);
   }
  },

  async signUp(
    signUpData
  ) {
    try {
      const response = await axios.post(
        BASE_URL + '/v1/api/account/sign-up',
        {
          username: signUpData.username,
          password: signUpData.password,
          confirmPassword: signUpData.confirmPassword,
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          email: signUpData.email,
          phoneNumber: signUpData.phoneNumber,
          dateOfBirth: signUpData.dateOfBirth,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      return response.data;
    } catch (error) {
      getErrorFromResponse(error);
    }
  },

  async verifyCode(token, code) {
    const response = await axios.post(
      BASE_URL + '/v1/api/account/verify',
      {
        code: code,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    return response.data;
  },

  async createVerifyCode(token) {
    const response = await axios.post(
      BASE_URL + '/v1/api/account/verify-code',
      null,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return response.data;
  },
};

export default AccountService;
