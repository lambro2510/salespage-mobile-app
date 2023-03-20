import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBox from './UI/SearchBox';
import * as Animatable from 'react-native-animatable';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Header = () => {
  const headerHeight = screenHeight * 0.1;
  const iconSize = headerHeight * 0.35;
  const fontSize = headerHeight * 0.3;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animatedValue]);

  return (
    <LinearGradient
      colors={['#6DD5ED', '#2193B0']}
      start={[0, 0]}
      end={[1, 1]}
      style={[styles.header, { height: headerHeight }]}
    >
      <Animatable.Text
        animation="fadeIn"
        duration={1500}
        style={[styles.title, { fontSize: fontSize }]}
      >
        My App
      </Animatable.Text>
      <SearchBox placeholder="search" />
      <Animated.View
        style={{
          transform: [
            {
              rotate: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['-15deg', '15deg'],
              }),
            },
          ],
        }}
      >
        <Ionicons name="cart" size={iconSize} color="#fff" />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0.03 * screenWidth,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
});

export default Header;
