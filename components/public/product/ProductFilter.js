import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import ModalOption from '../../share/UI/ModalOption';

const { width } = Dimensions.get('window');

const ProductFilter = ({ search }) => {
  const priceRangeOptions = [
    { label: '$0 - $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: '$200 - $500', value: '200-500' },
  ];

  const productTypeOptions = [
    { label: 'Đồ điện tử', value: 'DO_DIEN_TU' },
    { label: 'Laptop', value: 'Laptop' },
    { label: 'Diện thoại', value: 'DIEN_THOAI' },
    { label: 'Quần áo', value: 'QUAN_AO' },
  ];

  const [isPriceModalVisible, setIsPriceModalVisible] = useState(false);
  const [isProductTypeModalVisible, setIsProductTypeModalVisible] =
    useState(false);
  const [priceRange, setPriceRange] = useState('');
  const [productType, setProductType] = useState();

  useEffect(() => {
    console.log('isProductTypeModalVisible updated');
  }, [isProductTypeModalVisible]);

  const togglePriceModal = () => {
    setIsPriceModalVisible(!isPriceModalVisible);
    console.log('isPriceModalVisible is change ' + isPriceModalVisible);
  };

  const toggleProductTypeModal = () => {
    setIsProductTypeModalVisible(!isProductTypeModalVisible);
  };

  return (
    <View style={[styles.container, { width }]}>
      <TouchableOpacity
        onPress={toggleProductTypeModal}
        style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{productType || 'Loại sản phẩm'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={togglePriceModal}
        style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{priceRange || 'Giá tiền'}</Text>
      </TouchableOpacity>
      <ModalOption
        isVisible={isPriceModalVisible}
        setIsVisible={setIsPriceModalVisible}
        modalTitle={'Giá tiền'}
        listOption={priceRangeOptions}
        setValue={setPriceRange}
      />
      <ModalOption
        isVisible={isProductTypeModalVisible}
        setIsVisible={setIsProductTypeModalVisible}
        modalTitle={'Loại sản phẩm'}
        listOption={productTypeOptions}
        setValue={setProductType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333333',
  },
});

export default ProductFilter;
