import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants';

const SuccessModal = ({
  title,
  message,
  visible,
  onClose,
}) => {


  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(onClose);
    }
  }, [visible]);

  const backdropOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const modalScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  return (
    <Modal transparent visible={visible}>
      <View style={styles.container}>
        <Animated.View
          style={[styles.backdrop, { opacity: backdropOpacity }]}
        />
        <Animated.View
          style={[styles.modal, { transform: [{ scale: modalScale }] }]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.lottieView} >
            <LottieView
              style={{ flex: 1 }}
              source={require('../../assert/animation/Complete.json')}
              autoPlay
              loop={false}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  lottieView : {
    width: SCREEN_WIDTH * 0.3,
     height: SCREEN_HEIGHT * 0.1,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // màu xám
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#0099cc', // màu xanh dương
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#555', // màu xám
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  okButton: {
    backgroundColor: '#0099cc', // màu xanh dương
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SuccessModal;
