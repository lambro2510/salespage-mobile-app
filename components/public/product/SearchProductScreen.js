import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ProductService from '../../../services/ProductService';

import ModalOption from '../../share/UI/ModalOption';
import ListProductVertical from './ListProductVertical';
const SearchProductScreen = ({ searchInfo, navigation }) => {
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const response = await ProductService.getAllProducts(searchInfo);
    setMetaData(response.metadata);
    setProducts(response.data);
  };
  const [metaData, setMetaData] = useState({
    total: 0,
    totalPages: 0,
  });
  const [products, setProducts] = useState([]);
  const [isShowPrice, setIsShowPrice] = useState(false);
  const [isShowProductType, setIsShowProductType] = useState(false);

  const [price, setPrice] = useState();
  const [productType, setProductType] = useState();

  const prices = [
    { label: '0đ - 10.000đ', value: '1 - 10000' },
    { label: '10.000d - 100.000đ', value: '10000-100000' },
    { label: '100.000đ - 200.000đ', value: '100000-200000' },
    { label: '200.000đ - $500.000đ', value: '200000-500000' },
    { label: '500.000đ - $1.000.000đ', value: '500000-1000000' },
    { label: '1.000.000đ - $2.000.000đ', value: '1000000-2000000' },
    { label: '2.000.000đ - $5.000.000đ', value: '2000000-5000000' },
    { label: '5.000.000đ - $10.000.000đ', value: '5000000-10000000' },
  ];

  const types = [
    { label: 'Điện thoại', value: 'PHONE' },
    { label: 'Ti vi', value: 'TIVI' },
    { label: 'Máy tính xách tay', value: 'LAPTOP' },
    { label: 'Đồ ăn', value: 'FOOD' },
    { label: 'Quần áo', value: 'CLOTHING' },
    { label: 'Đồ làm đẹp', value: 'BEAUTY' },
    { label: 'Vật dụng gia đình', value: 'HOME_APPLIANCES' },
    { label: 'Sách', value: 'BOOKS ' },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <ModalOption
          isVisible={isShowPrice}
          modalTitle={'Giá tiền'}
          setIsVisible={setIsShowPrice}
          setValue={setPrice}
          listOption={prices}
        />
        <ModalOption
          isVisible={isShowProductType}
          modalTitle={'Loại sản phẩm'}
          setIsVisible={setIsShowProductType}
          setValue={setProductType}
          listOption={types}
        />
      </View>
      <View style={styles.listProduct}>
        <ListProductVertical items={products} navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  listProduct: {
    flex: 1,
  },
});
export default SearchProductScreen;
