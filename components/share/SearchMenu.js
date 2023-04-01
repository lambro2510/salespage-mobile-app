import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductService from '../../services/ProductService';
import LoadingScreen from './animation/LoadingScreen';
import SearchProductScreen from '../public/product/SearchProductScreen';

const SearchMenu = ({ navigation }) => {
  const [searchInfo, setSearchInfo] = useState({
    productType: null,
    productName: '',
    minPrice: null,
    maxPrice: null,
    storeName: null,
    ownerStoreName: null,
    currentPage: 0,
    pageSize: 5,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    loading();
    const timer = setTimeout(() => {
      if (searchInfo.productName) {
        ProductService.getAllProducts(searchInfo).then((products) => {
          const productNames = products.data.map(
            (product) => product.productName
          );
          const uniqueProductNames = [...new Set(productNames)];
          // group products by product name
          const groupedProducts = uniqueProductNames.map((productName) => ({
            name: productName,
            count: productNames.filter((name) => name === productName).length,
          }));
          setSuggestions(groupedProducts);
        });
      } else {
        setSuggestions([]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInfo]);

  const handleSearch = () => {
    loading();
    setIsShowResult(true);
    setSuggestions([]);
  };

  const handleTextChange = (text) => {
    setSearchInfo({ ...searchInfo, productName: text });
    loading();
    setIsShowResult(false);
  };

  const loading = () => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  };

  const SuggestionItem = ({ item, setSearchInfo, setSuggestions }) => {
    const handlePress = async () => {
      setSearchInfo({ ...searchInfo, productName: item.name });
      loading();
      setIsShowResult(true);
      setSuggestions([]);
    };

    return (
      <TouchableOpacity style={styles.suggestion} onPress={handlePress}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchForm}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.searchInputWrapper}>
          <TextInput
            style={[
              styles.searchInput,
              isFocused ? styles.searchInputActive : null,
            ]}
            placeholder="Tìm kiếm sản phẩm"
            value={searchInfo.productName}
            onChangeText={handleTextChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <TouchableOpacity
            style={styles.searchIconWrapper}
            onPress={handleSearch}>
            <Ionicons name="search" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {isShowResult == false && (
        <View style={styles.voucherContainer}>
          <Text>Nhận ưu đãi voucher tới 70% </Text>
          <Ionicons name="ios-gift" size={20} color="#000" />
        </View>
      )}
      {isLoading == true && <LoadingScreen />}
      {!isLoading && suggestions.length > 0 && !isShowResult && (
        <FlatList
          style={styles.suggestItem}
          data={suggestions}
          renderItem={({ item }) => (
            <SuggestionItem
              item={item}
              setSearchInfo={setSearchInfo}
              setSuggestions={setSuggestions}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      )}
      {!isLoading && isShowResult && (
        <SearchProductScreen searchInfo={searchInfo} navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  searchForm: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  searchInputWrapper: {
    flex: 1,
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchIconWrapper: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
  searchInputActive: {
    borderColor: '#007aff',
    borderWidth: 1,
  },
  voucherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffcc80',
    borderRadius: 8,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  suggestItem: {
    marginTop: 8,
    marginBottom: 16,
  },
  suggestion: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SearchMenu;
