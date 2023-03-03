import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Navigator } from 'react-native';
import SearchButton from './components/share/UI/SearchButton'
import AccountService from './services/AccountService';

export default function App() {
  const [error, setError] = React.useState('test');

  const handleSignIn = async () => {

      const response = await AccountService.signIn(
        'lambro25102001',
        'banhmy09@'
      );
  }

  return (
    <View>
      
    
      <SearchButton onPress={handleSignIn} />
      <Text>{error} abc</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
