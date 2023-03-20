import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppHeader from '../../share/AppHeader';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProductScreen from '../product/ProductScreen';
import ProfileScreen from '../profile/ProfileScreen';
import MainScreen from '../Main/MainScreen'
function HomeScreen(){
  const Tab = createBottomTabNavigator();
  return(
    
    <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Product') {
                  iconName = focused ? 'grid' : 'grid-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Home" component={MainScreen} />
            <Tab.Screen name="Product" component={ProductScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
  )
}


export default HomeScreen;
