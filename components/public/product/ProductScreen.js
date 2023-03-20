import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ProductService from '../../../services/ProductService';
import ProductCard from '../../share/ProductCard';
import ProductFilter from './ProductFilter'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const PAGE_SIZE = 5;

const ProductScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productType, setProductType] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [currentPage, setcurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  const loadProducts = async () => {
    setIsLoading(true);
    const productList = await ProductService.getAllProducts(
      currentPage,
      PAGE_SIZE,
      productType,
      minPrice,
      maxPrice
    );
    setProducts([...products, ...productList.data]);
    setTotalPage(productList.metadata.totalPages);
    setIsLoading(false);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPage - 1) {
      setcurrentPage(currentPage + 1);
    }
  };

  const handleSearch = () => {
    setProducts([]);
    setcurrentPage(0);
    loadProducts();
  };

  const renderItem = ({ item }) => <ProductCard item={item} />;

  const renderFooter = () => {
    if (!isLoading) {
      return null;
    }

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <ProductFilter handleSearch = {handleSearch}/>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.productList}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />
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
    marginHorizontal: screenWidth * 0.04,
    marginTop: 10,
    marginBottom: 5,
  },
  productList: {
    flex: 1,
    marginHorizontal: screenWidth * 0.04,
  },
  loadingContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ced0ce',
  },
});

export default ProductScreen;
