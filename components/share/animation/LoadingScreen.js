import { View } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingScreen = () => {
  return (
    <View style={{ width: '100%', height: '100%', position: 'relative' }}>
      <LottieView
        style={{ flex: 1 }}
        source={require('../../assert/animation/loading.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default LoadingScreen;
