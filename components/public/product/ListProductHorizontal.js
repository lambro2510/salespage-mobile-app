import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import HorizontalMenu from './HorizontalMenu';
const ListProduct = ({title, products, navigation}) => {
  return(
    <View style={styles.ListProductContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <HorizontalMenu style={styles.ListProductMenu} item = {products} navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    backgroundColor: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ListProductContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  ListProductMenu: {
    marginTop: 10,
  },
});



export default ListProduct;