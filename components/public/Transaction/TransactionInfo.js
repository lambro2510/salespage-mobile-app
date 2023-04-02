import React, { useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet ,ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TransactionInfo = ({ productTransactionInfo }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVoucherVisible, setIsModalVoucherVisible] = useState(false);
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
          <Text style={styles.infoLabel}>Sản phẩm: </Text>
          <Text style={styles.infoText}>{productTransactionInfo?.productName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Số lượng: </Text>
          <Text style={styles.infoText}>{productTransactionInfo?.quantity}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Có sử dụng mã giảm giá: </Text>
          <Text style={styles.infoText}>{productTransactionInfo?.isUseVoucher ? 'Có' : 'Không'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tổng tiền thanh toán: </Text>
          <Text style={styles.infoText}>
            {productTransactionInfo?.isUseVoucher
              ? (productTransactionInfo?.voucherInfo?.priceAfter * productTransactionInfo?.quantity || 0)
              : (productTransactionInfo?.pricePerProduct * productTransactionInfo?.quantity || 0)}
            đ
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>Xem chi tiết </Text>
        </TouchableOpacity>
      </Animatable.View>
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Animatable.Text style={styles.modalTitle} animation="fadeInDown" duration={1500}>
              THÔNG TIN CHI TIẾT GIAO DỊCH
            </Animatable.Text>
            <ScrollView style={styles.viewDetail}>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Mã giao dịch: </Text>
              <Text style={styles.modalText}>{productTransactionInfo?.transactionId}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Sản phẩm: </Text>
              <Text style={styles.modalText}>{productTransactionInfo?.productName}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Người bán: </Text>
              <Text style={styles.modalText}>{productTransactionInfo?.sellerName}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Người nhận hàng: </Text>
              <Text style={styles.modalText}>{productTransactionInfo?.buyerName}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Cửa hàng: </Text>
              <Text style={styles.modalText}>{productTransactionInfo?.storeName}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Địa chỉ giao hàng: </Text>
              <Text style={styles.modalText}>{productTransactionInfo?.address}</Text>
            </View>
            <View style={styles.modalRow}>

              <Text style={styles.modalLabel}>Số lượng: </Text>
              <Text style={styles.modalText}>{productTransactionInfo?.quantity}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Giá sản phẩm: </Text>
              <Text style={styles.modalText}>{productTransactionInfo?.pricePerProduct || 0}đ</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Tổng tiền thanh toán: </Text>
              <Text style={styles.modalText}>
                {productTransactionInfo?.isUseVoucher
                  ? (productTransactionInfo?.voucherInfo?.priceAfter || 0)
                  : (productTransactionInfo?.voucherInfo?.priceBefore * productTransactionInfo?.quantity || 0)}
                  đ
              </Text>
            </View>
            
            {productTransactionInfo?.isUseVoucher && (
              <>
                <TouchableOpacity
                  style={styles.modalVoucherButton}
                  onPress={() => setIsModalVoucherVisible(!isModalVoucherVisible)}
                >
                  <Text style={styles.modalVoucherButtonText}>Chi tiết mã giảm giá</Text>
                  <Icon
                    name={isModalVoucherVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color="#222"
                  />
                </TouchableOpacity>
                {isModalVoucherVisible && (
                  <View style={styles.modalVoucherContent}>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Mã giảm giá: </Text>
                      <Text style={styles.modalText}>{productTransactionInfo?.voucherInfo?.code}</Text>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Giá trị: </Text>
                      <Text style={styles.modalText}>{productTransactionInfo?.voucherInfo?.price}đ</Text>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Số lượng:</Text>
                      <Text style={styles.modalText}>{productTransactionInfo?.voucherInfo?.quantity}</Text>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Số lượng đã sử dụng:</Text>
                      <Text style={styles.modalText}>{productTransactionInfo?.voucherInfo?.usedQuantity}</Text>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Giá sau khi giảm:</Text>
                      <Text style={styles.modalText}>{productTransactionInfo?.voucherInfo?.priceAfter}đ</Text>
                    </View>
                  </View>
                )}
              </>
            )}
            </ScrollView>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoText: {},
  buttonContainer: {
  },
  button: {
    backgroundColor: '#007aff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '90%',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  modalLabel: {
    flex: 1,
    fontWeight: 'bold',
  },
  modalText: {
    flex: 2,
    textAlign: 'right',
  },
  modalButton: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalVoucherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modalVoucherButtonText: {
    fontWeight: 'bold',
  },
  modalVoucherContent: {
    marginTop: 8,
  },
});
export default TransactionInfo;