import { ToastAndroid, PixelRatio } from 'react-native';

export function getAuthHeader(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}


export function getErrorFromResponse(error) {
  console.log(error.response)
  if(error.response.status === 401){
    ToastAndroid.show(
      'Hết hạn đăng nhạp, vui lòng đăng nhập lại',
      ToastAndroid.SHORT
    );
    throw new Error('Login')
  }
  if (error.response.data.code == 1001) {
    ToastAndroid.show(
      getMessageFromError(error.response.data.message),
      ToastAndroid.SHORT
    );
  } else if (error.response.data.code == 1005 | 1000) {
    ToastAndroid.show(
      error.response.data.message,
      ToastAndroid.SHORT
    );
  } else {
    ToastAndroid.show(
      'Hệ thống không phản hồi, vui lòng thử lại',
      ToastAndroid.SHORT
    );
  }
}

export function getMessageFromError(message) {
  const regex = /default message \[(.*?)\]/g;
  const matches = message.match(regex);
  if (matches === null) {
    return "Lỗi hệ thống, vui lòng thử lại sau.";
  }
  const lastErrorMessage = matches[matches.length - 1].replace(/default message |\[|\]/g, '');
  return lastErrorMessage;
}



export function formatCurrency(number) {
  const parts = number.toFixed(3).toString().split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const decimalPart = parts[1].substring(0, 3);
  if (decimalPart === '000') {
    return integerPart + ' VND';
  }
  return integerPart + '.' + decimalPart + ' VND';
}

