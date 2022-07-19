
import  FontAwesome  from "react-native-vector-icons/FontAwesome";
import React from "react";
import Home from "../screens/Home";
import Food from "../screens/food";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const TabArr = [
    {route:'Home',label:'Home',type:FontAwesome,activeIcon:'home',inActiveIcon:'home-outline' ,component:Home},
  {route:'Food',label:'Home2',type:FontAwesome,activeIcon:'home',inActiveIcon:'home-outline' ,component:Food},
];
const Tabb =createBottomTabNavigator();
const Tab=()=>{
   
    return(
        <Tabb.Navigator screenOptions={{ 
            tabBarStyle:{backgroundColor:"#B100FF" ,height:60,position:'absolute' , bottom:16,
            right:16, left:16 ,borderRadius:10},tabBarInactiveTintColor:"#fff",
            tabBarActiveTintColor:"yellow" }}>
            {TabArr.map((item,index)=>{
                return( <Tabb.Screen name={item.route} component={item.component}
                options={{tabBarLabel:item.label,
                tabBarIcon:({color,focused})=>{<FontAwesome name={focused ?item.activeIcon
                :item.inActiveIcon} color={color} />}}}/>)
            })}
        </Tabb.Navigator>
    );
}
export default Tab;