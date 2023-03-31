import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ProductService from '../../../services/ProductService';
import ProductFilter from './ProductFilter';
import ListProduct from './ListProductHorizontal';
const screenWidth = Dimensions.get('window').width;

const ProductScreen = ({ navigation }) => {
  const [searchInfo, setSearchInfo] = useState({
    productType: null,
    minPrice: null,
    maxPrice: null,
    storeName: null,
    ownerStoreName: null,
    currentPage: 0,
    pageSize: 5,
  });

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productType, setProductType] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [currentPage, setcurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    loadProducts();
  }, [searchInfo]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const loadProducts = async () => {
    setIsLoading(true);
    const productList = await ProductService.getAllProducts(searchInfo);
    setProducts((prevProducts) => [...prevProducts, ...productList.data]);
    setTotalPage(productList.metadata.totalPages);

    setIsLoading(false);
  };

  const handleLoadMore = () => {
    if (searchInfo.currentPage < totalPage - 1) {
      setcurrentPage(currentPage + 1);
    }
  };

  const handleSearch = () => {
    setProducts([]);
    setSearchInfo({
      ...searchInfo,
      currentPage: 0,
    });
    loadProducts();
  };



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
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <ProductFilter handleSearch={handleSearch} />
      </View>
      <ListProduct title={"Được mua nhiều nhất"} products={products} navigation={navigation}/>
      <ListProduct title={"Giảm giá tốt nhất"} products={products} navigation={navigation}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: screenWidth * 0.04,
    marginTop: 10,
    marginBottom: 5,
  },
  loadingContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ced0ce',
  },
});

export default ProductScreen;
