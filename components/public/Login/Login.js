import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Switch,
  ScrollView,
  Animated,
} from 'react-native';
import AccountService from '../../../services/AccountService';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../redux/actions';
import { MAIN_LOGO_URL, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import NotificationModal from '../../share/UI/NotificationModal';
import LottieView from 'lottie-react-native';
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isRememberPassword, setIsRememberPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await AccountService.signIn(username, password);
      dispatch(setToken(response.token));
      setIsLoading(false);
      setShowSuccessNotification(true);
      setTimeout(() => {
        setShowSuccessNotification(false);
        navigation.goBack();
      }, 2000);
      return response.data;
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleForgotPassword = () => {
    navigation.goBack();
  };

  const handleGoogleLogin = () => {
    navigation.goBack();
  };

  const handleFacebookLogin = () => {
    navigation.goBack();
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{ uri: MAIN_LOGO_URL }} />
        <Text style={styles.appName}>Shop MyMarket </Text>
      </View>
      <View style={styles.formContainer}>
      
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
        />
        <View style={styles.subTab}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Switch
              value={isRememberPassword}
              onValueChange={setIsRememberPassword}
            />
            <Text style={{ marginLeft: 5 }}>Remember Me </Text>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password? </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={isLoading ? styles.disabledButton : styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Login </Text>
          )}
        </TouchableOpacity>
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity onPress={handleGoogleLogin}>
            <FontAwesome name="google-plus-square" size={30} color="#db4a39" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFacebookLogin}>
            <FontAwesome name="facebook-square" size={30} color="#3b5998" />
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerButton}>Register </Text>
          </TouchableOpacity>
        </View>
        <NotificationModal
          title={''}
          message={'Đăng nhập thành công'}
          visible={showSuccessNotification}
          onClose={() => {
            setShowSuccessNotification(false);
          }}
          isShowButton={false}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.05,
  },
  logo: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#009688',
  },
  appName: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH * 0.1,
    marginTop: SCREEN_HEIGHT * 0.05,
  },
  backButton: {
    posision: 'absolute',
    top: 20,
    left: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#009688',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  registerText: {
    fontSize: 16,
  },
  registerButton: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default LoginScreen;
