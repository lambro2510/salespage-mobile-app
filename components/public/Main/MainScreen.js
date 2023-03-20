import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppHeader from '../../share/AppHeader';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProductScreen from '../product/ProductScreen';
import ProfileScreen from '../profile/ProfileScreen';
export default function HomeComponent() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}