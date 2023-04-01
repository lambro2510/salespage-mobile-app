import React, { useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import TransactionInfo from './TransactionInfo';
const TransactionInfoScreen = ({ route, navigation }) => {
  const { productTransactionInfo } = route.params;
  return(
    <View>
      <TransactionInfo productTransactionInfo={productTransactionInfo}/>
    </View>
  )
}
export default TransactionInfoScreen;