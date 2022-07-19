import React from "react";
import { View } from "react-native";
import *as Animatable from "react-native-animatable";
const Top =() =>{
    return(<View style={{flexDirection:'row' ,padding:20,Margin:5,justifyContent:'space-between',marginBottom:5}}>
    <Animatable.Text animation="pulse" easing="ease-out"  iterationCount="infinite" style={{fontSize:20,color:'#B100FF', fontFamily:'VeganStyle',fontWeight:'bold'}}>HAYAT</Animatable.Text>
    <Animatable.Image source={require('../assets/logo.png')}
animation="bounceIn"
duration={1500}
style={{borderRadius:25 ,width:40 ,height:40}}
resizeMode='stretch'
/>
    </View>);
}
export default Top;