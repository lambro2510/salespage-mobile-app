import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RatingStar = ({ value = 0 }) => {
  const fullStars = Math.floor(value);
  const halfStar = value - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <View style={styles.rating}>
      {[...Array(fullStars)].map((index) => (
        <Icon name="star" size={20} color="#FFC107" key={index} />
      ))}
      {halfStar > 0 && <Icon name="star-half" size={20} color="#FFC107" />}
      {[...Array(emptyStars)].map((index) => (
        <Icon name="star-outline" size={20} color="#FFC107" key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});

export default RatingStar;
