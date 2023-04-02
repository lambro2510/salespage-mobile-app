import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { removeToken } from '../../../redux/actions';

const ProfileSettingScreen = ({logout, navigation}) => {
  
  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook
  const handleLogout = () => {
    dispatch(removeToken()); // Dispatch the removeToken action to set the token to null
    logout()
  };
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity style={styles.sectionButton}>
        <Text style={styles.sectionButtonText}>Ví của tôi</Text>
        <Ionicons
          name="wallet-outline"
          size={20}
          color="#333"
          style={styles.sectionButtonIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionButton} onPress={() => {navigation.navigate('TransactionHistory')}}>
        <Text style={styles.sectionButtonText}>Lịch sử mua hàng</Text>
        <Ionicons
          name="time-outline"
          size={20}
          color="#333"
          style={styles.sectionButtonIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionButton}>
        <Text style={styles.sectionButtonText}>Quà của tôi</Text>
        <Ionicons
          name="gift-outline"
          size={20}
          color="#333"
          style={styles.sectionButtonIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionButton}>
        <Text style={styles.sectionButtonText}>Thẻ giảm giá</Text>
        <Ionicons
          name="card-outline"
          size={20}
          color="#333"
          style={styles.sectionButtonIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionButton}>
        <Text style={styles.sectionButtonText}>Giỏ hàng</Text>
        <Ionicons
          name="cart-outline"
          size={20}
          color="#333"
          style={styles.sectionButtonIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionButton}>
        <Text style={styles.sectionButtonText}>Cài đặt tài khoản</Text>
        <Ionicons
          name="settings-outline"
          size={20}
          color="#333"
          style={styles.sectionButtonIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionButton} onPress={handleLogout}>
        <Text style={styles.sectionButtonText}>Đăng xuất</Text>
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#333"
          style={styles.sectionButtonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  sectionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  sectionButtonIcon: {
    marginRight: 10,
  },
});

export default ProfileSettingScreen;
