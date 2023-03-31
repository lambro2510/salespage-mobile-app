import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import AccountService from '../../../services/AccountService';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../redux/actions';
import { MAIN_LOGO_URL } from '../../../constants';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [signUpData, setSignUpData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
  });

  const handleRegister = async () => {
    const dateOfBirth =
      signUpData.day + '-' + signUpData.month + '-' + signUpData.year;
    const formData = { ...signUpData, dateOfBirth };
    const response = await AccountService.signUp(formData);
    console.log(response);
    dispatch(setToken(response.token));
    navigation.navigate('Home');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.registerContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{ uri: MAIN_LOGO_URL }} />
        <Text style={styles.appName}>MyMakert </Text>
      </View>
      <View style={styles.registerForm}>
        <TextInput
          style={styles.usernameInput}
          placeholder={'Username'}
          onChangeText={(text) =>
            setSignUpData({ ...signUpData, username: text })
          }
        />
        <TextInput
          style={styles.passwordInput}
          placeholder={'Password'}
          secureTextEntry={true}
          onChangeText={(text) =>
            setSignUpData({ ...signUpData, password: text })
          }
        />
        <TextInput
          style={styles.passwordInput}
          placeholder={'Confirm password'}
          secureTextEntry={true}
          onChangeText={(text) =>
            setSignUpData({ ...signUpData, confirmPassword: text })
          }
        />
        <View style={styles.nameContainer}>
          <TextInput
            style={styles.firstNameInput}
            placeholder={'First name'}
            onChangeText={(text) =>
              setSignUpData({ ...signUpData, firstName: text })
            }
          />
          <TextInput
            style={styles.lastNameInput}
            placeholder={'Last name'}
            onChangeText={(text) =>
              setSignUpData({ ...signUpData, lastName: text })
            }
          />
        </View>
        <TextInput
          style={styles.emailInput}
          placeholder={'Email'}
          onChangeText={(text) => setSignUpData({ ...signUpData, email: text })}
        />
        <TextInput
          style={styles.phoneNumberInput}
          placeholder={'Phone number'}
          onChangeText={(text) =>
            setSignUpData({ ...signUpData, phoneNumber: text })
          }
        />
        <View style={styles.dateInput}>
          <TextInput
            style={styles.dayInput}
            placeholder={'DD'}
            onChangeText={(text) => setSignUpData({ ...signUpData, day: text })}
          />
          <TextInput
            style={styles.monthInput}
            placeholder={'MM'}
            onChangeText={(text) =>
              setSignUpData({ ...signUpData, month: text })
            }
          />
          <TextInput
            style={styles.yearInput}
            placeholder={'YYYY'}
            onChangeText={(text) =>
              setSignUpData({ ...signUpData, year: text })
            }
          />
        </View>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Đã có tài khoản? Đăng nhập ngay </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  registerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
  },
  appName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  registerForm: {
    width: '80%',
  },
  usernameInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  firstNameInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '48%',
  },
  lastNameInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '48%',
  },
  emailInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '30%',
  },
  monthInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '30%',
  },
  yearInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '35%',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  loginButton: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: 'blue',
    marginBottom : 10,
  },
});
export default RegisterScreen;
