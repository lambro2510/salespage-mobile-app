import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';

import { useSelector } from 'react-redux';
import { formatCurrency } from '../../../utils';
import ProductTransactionService from '../../../services/ProductTransactionService';

const ConfirmTransactionScreen = ({
  product,
  isVisible,
  onClose,
  quantity,
  navigation
}) => {
  const [transaction, setTransaction] = useState({
    quantity: quantity,
    note: '',
    productId: product.id,
    voucherCode: null,
    address: '',
  });

  const token = useSelector(state => state.auth.token);
  const [totalPrice, setTotalPrice] = useState(product.price * quantity);

  const handlePaymentCodeInput = (text) => {
    setTransaction({
      ...transaction,
      voucherCode: text,
    });
  };

  const handleNoteInput = (text) => {
    setTransaction({ ...transaction, note: text });
  };

  const handleConfirmPurchase = async () => {
    if (transaction.address.trim() === '') {
      ToastAndroid.show(
        'Địa chỉ giao hàng không được để trống',
        ToastAndroid.SHORT
      );
      return;
    }
    setTransaction({ ...transaction, address: transaction.address.trim() });
    try{
      const response = await ProductTransactionService.createProductTransaction(transaction, token)
    }catch(error){
      navigation.navigate("Login")
    }
  };

  const handleCancelPurchase = () => {
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleCancelPurchase}>
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
        <View style={styles.productContainer}>
          <Image
            source={{ uri: product.imageUrls[0] }}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.productName}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>
              Price: {formatCurrency(product.price)}{' '}
            </Text>
            <Text style={styles.quantity}>Quantity: {quantity}</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Payment code:</Text>
          <TextInput
            style={styles.input}
            value={transaction.voucherCode}
            onChangeText={handlePaymentCodeInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Delivery address:</Text>
          <TextInput
            style={styles.input}
            value={transaction.address}
            onChangeText={(text) =>
              setTransaction({ ...transaction, address: text })
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Note:</Text>
          <TextInput
            style={styles.input}
            value={transaction.note}
            onChangeText={handleNoteInput}
          />
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.label}>Total price:</Text>
          <Text style={styles.price}>
            {formatCurrency(totalPrice)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmPurchase}>
          <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  closeButton: {
    fontSize: 16,
    color: '#000',
    alignSelf: 'flex-end',
  },
  productContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  confirmButton: {
    backgroundColor: '#3f51b5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfirmTransactionScreen;
