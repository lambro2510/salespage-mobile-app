import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../../../services/UserService';
import { useSelector } from 'react-redux';
import PersonalProfileScreen from './PersonalProfileScreen';
import ProfileSettingScreen from './ProfileSettingScreen';

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getProfile();
  }, [token]);

  const getProfile = async () => {
    const userProfile = await UserService.getProfile(token);
    setProfile(userProfile);
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setProfile(null);
    setIsLoggedIn(false); // đặt giá trị state isLoggedIn thành false khi đăng xuất
  };

  return (
    <View style={styles.container}>
      {profile?.username === undefined ? (
        <LoginButton handleLogin={handleLogin} />
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <PersonalProfileScreen profile={profile} />
          <ProfileSettingScreen logout={handleLogout} navigation={navigation}/>
        </ScrollView>
      )}
    </View>
  );
};

function LoginButton({ handleLogin }) {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>
        Vui lòng đăng nhập để sử dụng chức năng này.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: 10,
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  loginText: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    width: '80%',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
