import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView,AsyncStorage } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppHeader from './components/share/AppHeader';
import Router from "./router"

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
    <Provider store={store}>
      <NavigationContainer>
        <AppHeader />
        <Router />
      </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
