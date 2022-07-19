import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef,accessibilityState,props,animate } from 'react';
import* as Animatable from 'react-native-animatable'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Home from '../screens/Home';
import Profile from '../screens/profile';
import Food from '../screens/food';
import Add from '../screens/Add';
import Notification from '../screens/notifications';
const Tab = createBottomTabNavigator();
const TabNavigator =()=>{

    return(
 <Tab.Navigator  screenOptions={{ headerShown:false,
tabBarStyle:{backgroundColor:"#B100FF",
height:60,position:'absolute' ,paddingBottom:10, bottom:16,
right:16, left:16 ,borderRadius:10},tabBarInactiveTintColor:"#ffffff",
tabBarActiveTintColor:"#FCC10F" }}>
<Tab.Screen name="Object" component={Home}  options={{tabBarIcon:({color,size})=>(
    <FontAwesome5 name='box-open'color={color} size={size}  />
)}}
/> 
<Tab.Screen name='Food' component={Food} options={{ tabBarIcon : ({color ,size})=>(
        <MaterialIcons name='restaurant'color={color} size={size} />
)
    }}/>
    <Tab.Screen name='Add' component={Add }  options={{ tabBarIcon : ({color ,size})=>(
        <Animatable.View  duration={2000}>
        <FontAwesome name='plus'color={color} size={size}  />
        </Animatable.View>
    )
    }}/>
    <Tab.Screen name='Updates' component={Notification} options={{  tabBarIcon : ({color ,size})=>(
        <FontAwesome name='bell'color={color} size={size} ></FontAwesome>
    )
    }}/>
    <Tab.Screen name='Profile' component={Profile} options={{ tabBarIcon : ({color ,size})=>(
        <FontAwesome name="user" color={color} size={size} />
    )
    }} />
</Tab.Navigator>
);
}
export default TabNavigator;