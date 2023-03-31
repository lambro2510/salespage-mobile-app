import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';

import ProductService from '../../../services/ProductService';
import RatingStar from '../../share/UI/RatingStar';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants';

const SellProductCard = ({ item, children, navigation }) => {
  const [isHot, setIsHot] = useState(item.isHot | true);
  const hotValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(hotValue, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: false,
        }),
        Animated.timing(hotValue, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  if (isHot) {
    startAnimation();
  }

  const hotStyle = {
    backgroundColor: hotValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#ff0000', '#ff7700'],
    }),
  };

  const showProductDetail = async () => {
    const productDetail = await ProductService.getProductDetail(item.id);
    navigation.navigate('ProductDetail', { product: productDetail, navigation: navigation});
  };
  return (
    <TouchableOpacity style={styles.container} onPress={showProductDetail}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrls[0] }} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={styles.productName}
          numberOfLines={2}
          resizeMode="corver"
          ellipsizeMode="tail">
          {item.productName}
        </Text>
        <View style={styles.productInfo}>
          <RatingStar value={item.rate.avgPoint} />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price} đ</Text>
            <View style={styles.totalRateContainer}>
              <Icon name="heart" size={12} color="#333" style={{paddingTop:'2%'}}/>
              <Text style={styles.totalRate}>{item.rate.totalRate}</Text>
            </View>
          </View>
        </View>
        {children}
      </View>
      {isHot && (
        <Animated.Text style={[styles.hot, hotStyle]}>{'HOT'}</Animated.Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 0.35 * SCREEN_HEIGHT,
    width: 0.4 * SCREEN_WIDTH,
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginRight: '5%',
    marginBottom: '10%',
  },
  imageContainer: {
    height: 0.2 * SCREEN_HEIGHT,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    marginBottom: '5%',
    marginTop: '5%',
    backgroundColor: 'inherit',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '80%',
  },
  infoContainer: {
    padding: 10,
    position: 'relative',
    backgroundColor: '#EAEAEA',
    height: 0.15 * SCREEN_HEIGHT,
  },
  productInfo: {
    position: 'absolute',
    width : '100%',
    bottom: '15%',
    left: '5%',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 14,
    color: '#ff0000',
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalRateContainer: {
    flex : 1,
    flexDirection: 'row',
    justifyContent : 'center'
  },
  totalRate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },

  hot: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: 5,
  },
});

export default SellProductCard;
