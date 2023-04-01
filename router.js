import { createStackNavigator } from '@react-navigation/stack';

import AppHeader from './components/share/AppHeader';
import LoginScreen from './components/public/Login/Login';
import HomeScreen from './components/public/Home/HomeScreen';
import RegisterScreen from './components/public/Registor/Register';
import ProductDetailScreen from './components/public/product/ProductDetailScreen';
import SearchMenu from './components/share/SearchMenu';
import TransactionInfoScreen from './components/public/Transaction/TransactionInfoScreen';
export default function Router() {
  const Stack = createStackNavigator();

  return (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SearchMenu" component={SearchMenu} />
          <Stack.Screen name="TransactionInfoScreen" component={TransactionInfoScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
  );
}

