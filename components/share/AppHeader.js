import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ navigation }) => {

  const handlePress = () => {
    navigation.navigate('SearchMenu');
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.searchBar} onPress={handlePress}>
        <Ionicons name="search" size={24} color="black" />
        <Text style={styles.searchText}>{'Tìm kiếm'}</Text>
      </TouchableOpacity>
      <Ionicons name="cart" size={24} color="black" />
      <Ionicons name="mail" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    flex: 1,
    marginRight: 16,
    paddingHorizontal: 12,
    height: 36,
  },
  searchText: {
    marginLeft: 8,
    color: '#b6b6b6',
  },
});

export default Header;
