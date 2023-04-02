import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import {FlatList} from 'react-native';
import { View, Text } from "react-native-animatable";

import TransactionInfo from './TransactionInfo';
import ProductTransactionService from '../../../services/ProductTransactionService';
import ErrorModal from '../../share/animation/ErrorModal';

const TransactionHistoryScreen = ({navigation}) => {
	const token = useSelector(state => state.auth.token);
	const [transactionFilter, setTransactionFilter] = useState({
		sellerUsername: '',
		storeName: '',
		startDate: '',
		endDate: '',
		page: 0,
		size: 10,
		sort: ''
	});
	const [metadata, setMetadata] = useState({
		total: 0,
		totalPages: 0
	});
	const [errorData, setErrorData] = useState({ visible: false, message: '' });
	const [listProductTransaction, setListProductTransaction] = useState([]);

	const getListTransactionHistory = async () => {
		try {
			const response = await ProductTransactionService.getListTransactionHistory(transactionFilter, token);
			setListProductTransaction(response.data);
			setMetadata(response.metadata);
		} catch (error) {
			setErrorData({ visible: true, message: error.message });
		}
	};

	useEffect(() => {
		getListTransactionHistory();
	},[token,transactionFilter]);

	return (
		<View>
			<Text onPress={() => {
				navigation.goBack()
			}} >Back </Text>
			<FlatList
				data={listProductTransaction}
				renderItem={({ item }) => <TransactionInfo productTransactionInfo={item} />}
				keyExtractor={(item, index) => index.toString()}
			/>
			<ErrorModal error={errorData} onClose={() => setErrorData({ ...errorData, visible: false })} />
		</View>
	);
};

export default TransactionHistoryScreen;
