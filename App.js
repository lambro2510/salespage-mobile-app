import React, { useState, useEffect } from 'react';
import {Platform, View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './redux/store';
import Router from "./router"
import LottieView from 'lottie-react-native';
export default function App() {

  return (
    <SafeAreaView style={styles.container}>
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop : '5%'
  },
});
