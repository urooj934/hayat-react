
import SplashScreen from '../screens/splashscreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import DonateFood from '../screens/DonateFood';
import DonateClothes from '../screens/DonateClothes';
import RequestFood from '../screens/RequestFood';
import RequestClothes from '../screens/RequestClothes';
import SignUp from '../screens/SignUp';
import TabNavigator from './tabNavigator';
import Profile from '../screens/profile';
import Home from '../screens/Home';
import Add from '../screens/Add';
import EditProfile from '../screens/EditProfile';
import Food from '../screens/food';
import Feedback from '../screens/feedBack';
import AboutUs from '../screens/AboutUs';
import ForgotPassword from '../screens/ForgotPassword';
import Map from '../screens/Map';
import MapRf from '../components/MapRf';
import MapDf from '../components/MapDf';
import MapRc from '../components/MapRc';
const Stack = createNativeStackNavigator();
const AuthStack =()=>{
   return( <NavigationContainer>
    <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}} >
      <Stack.Screen name="Splashscreen" component={SplashScreen} screenOptions={{headerShown:false}}/>
      <Stack.Screen name='Login' component={Login} screenOptions={{headerShown:false}}/>
      <Stack.Screen name='SignUp' component={SignUp} screenOptions={{headerShown:false}}  />
      <Stack.Screen name='Add' component={Add} screenOptions={{headerShown:false}} />
      <Stack.Screen name='Donate Food' component={DonateFood} screenOptions={{headerShown:false}} />
      <Stack.Screen name='Donate Clothes' component={DonateClothes} screenOptions={{headerShown:false}} />
      <Stack.Screen name='Request Food' component={RequestFood} screenOptions={{headerShown:false}} />
      <Stack.Screen name='Request Clothes' component={RequestClothes} screenOptions={{headerShown:false}}  />
      <Stack.Screen name='Home' component={Home} screenOptions={{headerShown:false}}  /> 
      <Stack.Screen name='Food1' component={TabNavigator} screenOptions={{headerShown:false}} />
      <Stack.Screen name='Profile'component={Profile} screenOptions={{headerShown:false}}/>
      <Stack.Screen name='EditProfile' component={EditProfile} screenOptions={{headerShown:true}}/>
      <Stack.Screen name='Feedback' component={Feedback} screenOptions={{headerShown:true}}/>
      <Stack.Screen name='AboutUs' component={AboutUs} screenOptions={{headerShown:true}}/>
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} screenOptions={{headerShown:true}}/>
      <Stack.Screen name='Map' component={Map} screenOptions={{headerShown:true}}/>
      <Stack.Screen name='MapRf' component={MapRf} screenOptions={{headerShown:true}}/>
      <Stack.Screen name='MapDf' component={MapDf} screenOptions={{headerShown:true}}/>
      <Stack.Screen name='MapRc' component={MapRc} screenOptions={{headerShown:true}}/>
    </Stack.Navigator>
  </NavigationContainer>);
}
export default AuthStack;