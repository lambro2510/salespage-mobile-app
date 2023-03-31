import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import BuyProductMenu from './BuyProductMenu';
import RatingStar from '../../share/UI/RatingStar';
const ProductDetailScreen = ({ route }) => {
  const { product, navigation } = route.params;
  const [quantity, setQuantity] = useState(1);

  const renderItem = ({ item }) => {
    return <Image style={styles.image} source={{ uri: item }} />;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#000000" />
        </TouchableOpacity>
        <View style={styles.mainInfo}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={product.imageUrls}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            renderItem={renderItem}
          />
          <Text style={styles.productName}>{product.productName}</Text>
          <Text style={styles.price}>{product.price} VND</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              {<RatingStar value={product.rate.avgPoint} />} (
              {product.rate.totalRate} đánh giá)
            </Text>
            <Text style={styles.sellerName}>
              Bán bởi: {product.sellerUsername}
            </Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <BuyProductMenu style={styles.buyProductMenu} product={product} quantity={quantity} navigation={navigation}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginHorizontal: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4500',
    marginTop: 8,
  },
  rating : {
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  quantityButton: {
    fontSize: 24,
    color: '#FF4500',
    paddingHorizontal: 16,
  },
  quantity: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  bottomContainer: {},
});

export default ProductDetailScreen;
