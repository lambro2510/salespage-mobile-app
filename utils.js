import { ToastAndroid, PixelRatio } from 'react-native';

export function getAuthHeader(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}


import { Alert, Platform } from 'react-native';

export function getErrorFromResponse(error) {
  console.log(error.response)
  if(error.response.status === 401){
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        'Hết hạn đăng nhạp, vui lòng đăng nhập lại',
        ToastAndroid.SHORT
      );
    } else {
      Alert.alert(
        'Hết hạn đăng nhập',
        'Vui lòng đăng nhập lại',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    throw new Error('Login')
  }
  if (error.response.data.code == 1001) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        getMessageFromError(error.response.data.message),
        ToastAndroid.SHORT
      );
    } else {
      Alert.alert(
        'Lỗi',
        getMessageFromError(error.response.data.message),
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    throw new Error(getMessageFromError(error.response.data.message))
  } else if (error.response.data.code == 1005 | 1000) {
    throw new Error(error.response.data.message)
  } else {
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        'Hệ thống không phản hồi, vui lòng thử lại',
        ToastAndroid.SHORT
      );
    } else {
      Alert.alert(
        'Lỗi',
        'Hệ thống không phản hồi, vui lòng thử lại',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    throw new Error('Server error')
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
    return integerPart + ' VND ';
  }
  return integerPart + '.' + decimalPart + ' VND ';
}

export function formatPhoneNumber(phoneNumber) {
  // Xóa tất cả các khoảng trắng, dấu ngoặc đơn và dấu gạch ngang
  phoneNumber = phoneNumber.replace(/[\s()-]/g, '');
  
  // Nếu số điện thoại bắt đầu bằng 0, thay thế bằng +84
  if (phoneNumber.startsWith('0')) {
    phoneNumber = '+84' + phoneNumber.slice(1);
  }
  
  return phoneNumber;
}

