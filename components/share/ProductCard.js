import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProductCard = ({ item }) => {
  const test = () => {
    console.log(item);
  }
  return (
    <View style={styles.productItem}>
      <Image source={{ uri: item.imageUrls ? item.imageUrls[0] : "url"}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productAddress}>{item.sellingAddress}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  productItem: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row'
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10
  },
  productInfo: {
    flex: 1
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Roboto',
    marginBottom: 5
  },
  productDescription: {
    fontSize: 12,
    fontFamily: 'Roboto',
    marginBottom: 5
  },
  sellingAddress: {
    fontSize: 12,
    fontFamily: 'Roboto',
    marginBottom: 5
  },
  sellerUsername: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#aaa'
  }
});

export default ProductCard;
