import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import UserService from '../../../services/UserService';
const PersonalProfileScreen = ({ profile }) => {
  
  const [imageScale] = useState(new Animated.Value(1));

  const handleImagePressIn = () => {
    Animated.spring(imageScale, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handleImagePressOut = () => {
    Animated.spring(imageScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const [image, setImage] = useState(null);

  const handleChooseImage = async () => {
    
  };

  const handleImageUpload = async (image) => {
    try {
      const response = await UserService.uploadImage(token, image);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7F7FD5', '#86A8E7', '#91EAE4']}
        style={styles.gradient}>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPressIn={handleImagePressIn}
              onPressOut={handleImagePressOut}
              onPress={handleChooseImage}>
              <Animated.Image
                source={{ uri: profile.imageUrl }}
                style={[styles.image, { transform: [{ scale: imageScale }] }]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.displayName}>{profile.displayName}</Text>
            <View style={styles.infoContainer}>
              <View style={styles.rowContainer}>
                <FontAwesome name="envelope-o" size={18} color="#fff" />
                <Text style={styles.text}>{profile.email}</Text>
              </View>
              <View style={styles.rowContainer}>
                <FontAwesome name="dollar" size={18} color="#fff" />
                <Text style={styles.text}>
                  Balance: {profile.balance.money} (
                  {profile.balance.type})
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <FontAwesome name="star" size={18} color="#fff" />
                <Text style={styles.text}>
                  Rating: {profile.rate.avgPoint} ({profile.rate.totalRate}{' '}
                  votes)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  displayName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
});

export default PersonalProfileScreen;
