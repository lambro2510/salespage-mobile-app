import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SearchBox = ({ placeholder }) => {
  const paddingRatio = screenWidth / 360;
  const fontSizeRatio = screenWidth / 20;

  return (
    <View
      style={[
        styles.searchBox,
        { width: screenWidth * 0.8, height: screenHeight * 0.06 },
      ]}
    >
      <View style={styles.searchIcon}>
        <Ionicons name="search" size={24} color="#888" />
      </View>
      <TextInput
        style={[styles.searchInput, { fontSize: fontSizeRatio }]}
        placeholder={placeholder}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 30,
    marginHorizontal: Dimensions.get('window').width * 0.04,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#f1f1f1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    color: '#333',
    width : screenWidth * 0.2,
  },
  searchIcon: {
    marginLeft: 5,
    marginRight: 10,
  },
});

export default SearchBox;
