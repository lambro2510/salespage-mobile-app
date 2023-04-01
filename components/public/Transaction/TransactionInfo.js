import React, { useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';

const TransactionInfo = ({productTransactionInfo}) => {
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
      // Set animation cho phần tử infoContainer
      const infoContainerRef = infoContainerRef?.zoomIn?.(1500);
      return () => {
        infoContainerRef?.fadeOut?.(1000);
      };
    }, []);
  
    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };
  
    return (
      <View style={styles.container}>
        <Animatable.View style={styles.infoContainer} ref={(ref) => (infoContainerRef = ref)}>
          <Animatable.Text style={styles.infoTitle} animation="fadeInDown" duration={1500}>
            THÔNG TIN GIAO DỊCH
          </Animatable.Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Mã giao dịch: </Text>
            <Text style={styles.infoText}>{productTransactionInfo?.transactionId}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sản phẩm: </Text>
            <Text style={styles.infoText}>{productTransactionInfo?.productName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Giá sản phẩm: </Text>
            <Text style={styles.infoText}>{productTransactionInfo?.pricePerProduct}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số lượng: </Text>
            <Text style={styles.infoText}>{productTransactionInfo?.quantity}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Người bán: </Text>
            <Text style={styles.infoText}>{productTransactionInfo?.sellerName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cửa hàng: </Text>
            <Text style={styles.infoText}>{productTransactionInfo?.storeName}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.buttonText}>Xem chi tiết </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
        <Modal animationType="slide" visible={modalVisible}>
          <View style={styles.modalContainer}>
            <Animatable.Text style={styles.modalTitle} animation="fadeInDown" duration={1500}>
              THÔNG TIN CHI TIẾT GIAO DỊCH
            </Animatable.Text>
            <View style={styles.modalContent}>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Mã giao dịch: </Text>
                <Text style={styles.modalText}>{productTransactionInfo?.transactionId}</Text>
              </View>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Sản phẩm: </Text>
                <Text style={styles.modalText}>{productTransactionInfo?.productName}</Text>
              </View>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Giá sản phẩm: </Text>
                <Text style={styles.modalText}>{productTransactionInfo?.pricePerProduct}</Text>
              </View>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Số lượng: </Text>
                <Text style={styles.modalText}>{productTransactionInfo?.quantity}</Text>
              </View>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Người mua: </Text>
                <Text style={styles.modalText}>{productTransactionInfo?.buyerName}</Text>
              </View>buyerName
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Người bán: </Text>
                <Text style={styles.modalText}>{productTransactionInfo?.sellerName}</Text>
              </View>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Cửa hàng: </Text>
                <Text style={styles.modalText}>{productTransactionInfo?.storeName}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Đóng </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    infoContainer: {
      backgroundColor: '#f2f2f2',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    infoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    infoLabel: {
      fontWeight: 'bold',
      marginRight: 10,
    },
    infoText: {},
    buttonContainer: {
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#007aff',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    modalContent: {
      backgroundColor: '#f2f2f2',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    modalLabel: {
      fontWeight: 'bold',
      marginRight: 10,
    },
    modalText: {},
    closeButton: {
      backgroundColor: '#007aff',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  
  export default TransactionInfo;