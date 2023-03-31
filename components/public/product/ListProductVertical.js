import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import SellProductCard from './SellProductCard';
import {SCREEN_WIDTH} from '../../../constants';
const ListProductVertical = ({ items, navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listItem}
        showsVerticalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => (
          <SellProductCard item={item} navigation={navigation}/>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  listItem : {
    marginLeft : '3.5%',
  }
});

export default ListProductVertical;
