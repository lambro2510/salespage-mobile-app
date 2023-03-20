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

import { AntDesign } from '@expo/vector-icons';
import AccountService from '../../../services/AccountService';
import { useDispatch } from 'react-redux';
import {setToken} from '../../../redux/actions'

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleRegister = async () => {
    // Validate inputs
    if (
      !username ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      !email ||
      !phoneNumber ||
      !dateOfBirth
    ) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const response = await AccountService.signUp(username,password,confirmPassword,firstName,lastName,email,phoneNumber,dateOfBirth);
    console.log(response)
    dispatch(setToken(response.token))
    
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
        source={'https://img.freepik.com/premium-vector/abstract-crossed-circle-logo-illustration-trendy-minimal-style_1375-6852.jpg?w=826'} style={styles.logo} />
        <Text style={styles.title}>Create Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <AntDesign
            name="user"
            size={24}
            color="#007bff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>
        <View style={styles.inputWrapper}>
          <AntDesign
            name="user"
            size={24}
            color="#007bff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
          />
        </View>
        <View style={styles.inputWrapper}>
          <AntDesign
            name="user"
            size={24}
            color="#007bff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
          />
        </View>
        <View style={styles.inputWrapper}>
          <AntDesign
            name="lock"
            size={24}
            color="#007bff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <View style={styles.inputWrapper}>
          <AntDesign
            name="lock"
            size={24}
            color="#007bff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </View>
        <View style={styles.inputWrapper}>
          <AntDesign
            name="mail"
            size={24}
            color="#007bff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputWrapper}>
          <AntDesign
            name="phone"
            size={24}
            color="#007bff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
          />
        </View>
        <View style={styles.inputWrapper}>
          <AntDesign
            name="calendar"
            size={24}
            color="#007bff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (DD/MM/YYYY)"
            onChangeText={(text) => setDateOfBirth(text)}
            value={dateOfBirth}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signIn}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInText}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputContainer: {
    width: '80%',
    marginTop: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#007bff',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 18,
    color: '#000',
  },
  icon: {
    marginRight: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signIn: {
    marginTop: 20,
  },
  signInText: {
    color: '#007bff',
    fontSize: 16,
  },
});
