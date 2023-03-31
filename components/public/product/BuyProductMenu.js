import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { getTextStyle } from '../../../constants';
import ConfirmTransactionScreen from '../Transaction/ConfirmTransactionScreen';

const BuyProductMenu = ({ product, quantity,navigation }) => {
  const [liked, setLiked] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLikeButton = () => {
    setLiked(!liked);
  };

  const handleBuyNowButton = () => {
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  return (
    <View style={styles.buyProductMenuContainer}>
      <TouchableOpacity
        style={[
          styles.likeProductButton,
          { backgroundColor: liked ? '#FF69B4' : '#fff' },
        ]}
        onPress={handleLikeButton}>
        {liked ? (
          <AntDesign name="heart" size={20} color="#fff" />
        ) : (
          <AntDesign name="hearto" size={20} color="#000" />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.addToCartButton}>
        <FontAwesome name="cart-plus" size={25} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buyNowButton}
        onPress={handleBuyNowButton}>
        <Text style={[styles.buttonText, { color: '#fff' }]}>Mua ngay</Text>
      </TouchableOpacity>
      <ConfirmTransactionScreen
        isVisible={showConfirmation}
        onClose={handleConfirmationClose}
        product={product}
        quantity={quantity}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buyProductMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  likeProductButton: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButton: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowButton: {
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#FDB813',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDB813',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default BuyProductMenu;
