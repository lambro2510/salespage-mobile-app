import React, {useEffect} from 'react';
import { View, Image, StyleSheet, Text, FlatList } from 'react-native';
import SellProductCard from './SellProductCard';
import {SCREEN_WIDTH} from '../../../constants';
const HorizontalMenu = ({item, navigation}) => {

useEffect(() => {
  });
const renderItem = ({ item }) => (
    <SellProductCard item = {item} navigation={navigation}/>
  );

  return (
    <View >
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
        data={item}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginHorizontal: SCREEN_WIDTH * 0.01, // tùy chỉnh khoảng cách theo chiều dọc giữa các phần tử
  },
});


export default HorizontalMenu;
