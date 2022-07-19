
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './navigation/AuthStack';
export default function App() {
 const Stack = createNativeStackNavigator();
  return (
    <AuthStack/> 
  );
}
