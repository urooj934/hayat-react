
import React, { Component, useState } from "react";
import * as Animatable from 'react-native-animatable';
import { View ,Text,Dimensions ,SafeAreaView  ,TextInput,StyleSheet } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import CustomSwitch from "../components/CustomSwitch";
import Reqclotheslist from "../components/reqclotheslist";
import DonateClothesList from"../components/DonateClothesList"
import { ScrollView } from "react-native-virtualized-view";
const Home =({navigation})=>{
    const[donationTab ,setDonationTab] =useState(1);
    const onSelectSwitch=(value)=>{
 setDonationTab(value);
    }
    const{Height} =Dimensions.get('screen');
      
 return(   
<SafeAreaView style={{flex :1 ,height:Height , paddingHorizontal:20, Margin:5,marginBottom:250}}>
<Animatable.View animation="fadeInRight" duration={1500} style={styles.footer}>
<View style={{padding:20}}>
    <View style={{flexDirection:'row' ,justifyContent:'space-between',marginBottom:5}}>
        <Animatable.Text animation="pulse" easing="ease-out"  iterationCount="infinite" 
        style={{fontSize:20,
        color:'#B100FF',
        fontWeight:'bold'}}>HAYAT</Animatable.Text>
        <Animatable.Image source={require('../assets/logo.png')}
    animation="bounceIn"
    duration={1500}
    style={{borderRadius:25 ,width:40 ,height:40}}
    resizeMode='stretch'
    />
        </View>
 <View style={{flexDirection:"row", BorderColor:"#C6C6C6",borderWidth:2, marginTop:5,
 borderRadius:8, paddingHorizontal:10,paddingVertical:8 }}>
     <Feather
      name="search" size={20} color="#C6C6C6"
     style={{marginRight: 10 }}/>
     <TextInput placeholder="search"></TextInput>
 </View>
 <View style={{marginTop:10}}>
     <CustomSwitch selectionMode={1} option1="donations" option2="Requests"
     onSelectSwitch={onSelectSwitch} />
 </View>
 </View>
 <ScrollView style={{padding:10}} nestedScrollEnabled={true}>
 {donationTab==1 && <DonateClothesList/>}
 {donationTab==2 && <Reqclotheslist/>}
    </ScrollView>
    </Animatable.View>
</SafeAreaView>

 );
}
export default Home;
const styles=StyleSheet.create({
    footer:{
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
    }
})