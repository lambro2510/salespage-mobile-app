import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountService from '../../../services/AccountService';
import { useDispatch } from 'react-redux';
import {setToken} from '../../../redux/actions'

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await AccountService.signIn(username, password);
      dispatch(setToken(response.token));
      setIsLoading(false);
      navigation.goBack(); // Trở về trang trước đó sau khi đăng nhập thành công
      return response.data;
    } catch (error) {
      console.log('Error while signing in: ', error);
      setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      setIsLoading(false);
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  }

  const handleUsernameChange = (text) => {
    setUsername(text);
    setError('');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setError('');
  };

  const buttonOpacity = animation.interpolate({
    inputRange: [-10, 0, 10],
    outputRange: [0.6, 1, 0.6],
  });

  const buttonTranslateY = animation.interpolate({
    inputRange: [-10, 0, 10],
    outputRange: [-3, 0, -3],
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>My App</Text>
      </View>
      <Text style={styles.title}>Đăng nhập</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={handleUsernameChange}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}>
        <Animated.Text
          style={[
            styles.buttonText,
            {
              opacity: buttonOpacity,
              transform: [{ translateY: buttonTranslateY }],
            },
          ]}>
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0077cc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: '#ff0000',
    marginBottom: 10,
  },
  // Style cho màn hình đăng ký
  registerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  registerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  registerInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0077cc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerLink: {
    color: '#0077cc',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});


export default LoginScreen;
