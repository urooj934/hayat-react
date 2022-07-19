import React from "react";
import { View,Text,TouchableOpacity,Dimensions,TextInput,StyleSheet,KeyboardAvoidingView ,Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import * as Animatable from 'react-native-animatable';
import {auth, firestore } from "../firebase/firebase";
const RequestClothes=({navigation})=>{
    const[name,setName]=React.useState('');
    const[title,setTitle]=React.useState('');
    const[desc,setDesc]=React.useState('');
    const[category,setCategory]=React.useState('');
    const[phoneno,setPhoneno]=React.useState('') ;
    const handlePostReq=()=>{
        if (name==''||title==''||desc==''||category==''||phoneno=='' ){
            alert('submit fields');
        }
        else{
        createReqObjectDocument(name,title,desc,category,phoneno);
        }
        }
    const createReqObjectDocument =async (name,title,desc,category,phoneno)=>{
        const Reqobjects = await firestore.collection('Reqobjects').doc();
            try{
              Reqobjects.set({
                uid :auth.currentUser.uid,
                name,
                title,
                desc,
                category,
                phoneno,
                status:'null',
                delivery:'null',
                location:'null',
                  createdAt:new Date(),
              });
              navigation.navigate('MapRc');
            // Alert.alert('submitted','request submitted');
              setTitle(null);
              setDesc(null);
              setPhoneno(null);
              setCategory(null);
            }
            catch(error){
              alert(error.message);
            }}
 
    return(
        <KeyboardAvoidingView style={styles.container}>
        <View style={styles.bigCircle} ></View>
    <View style={styles.smallCircle} ></View>
         <View style={styles.centarizedView}>
        <View style={styles.Box}>
        <View style={styles.logobox}>
        <Animatable.Image source={require('../assets/object.png')}
    animation="bounceIn"
    duration={1500}
    style={{width:100,height:100,borderRadius:90}}
    resizeMode='stretch'
    /></View>  
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height' }> 
    <View style={styles.action}> 
  <FontAwesome name="user" size={20} color="#05375A"/>
  <TextInput placeholder="Your Name" placeholderTextColor={'#c5c8c9'}
  value={name}
  onChangeText={value=>setName(value)}
  style={styles.textInput}></TextInput>
  </View> 
    <View style={styles.action}> 
  <FontAwesome name="edit" size={20} color="#05375A"/>
  <TextInput placeholder="title" placeholderTextColor={'#c5c8c9'}
  value={title}
  onChangeText={value=>setTitle(value)}
  style={styles.textInput}></TextInput>
  </View> 
  <View style={styles.description}>
  <FontAwesome name="align-left" size={20} color="#05375A"/>
  <TextInput placeholder="Description"  placeholderTextColor={'#c5c8c9'} 
  value={desc}
  onChangeText={value=>setDesc(value)}
  style={styles.textInput }></TextInput>
  </View>
  <View style={styles.action}>
  <FontAwesome name="phone" size={20} color="#05375A"/>
  <TextInput placeholder="your phone-no" keyboardType="number-pad" placeholderTextColor={'#c5c8c9'}
  value={phoneno}
  onChangeText={value=>setPhoneno(value)} 
  style={styles.textInput}></TextInput>
  </View>
  <View style={styles.action}>
  <FontAwesome5 name="layer-group" size={20} color="#05375A"/>
  <TextInput placeholder="Category" placeholderTextColor={'#c5c8c9'}
  value={category}
  onChangeText={value=>setCategory(value)
  } style={styles.textInput}/>
  </View>
  </KeyboardAvoidingView> 
  <TouchableOpacity style={styles.commandButton} onPress={handlePostReq} >
    <Text style={styles.panelButtonTitle}>Request</Text>
  </TouchableOpacity>
  </View>
 </View>
    </KeyboardAvoidingView>);
}
export default RequestClothes;
const styles =StyleSheet.create({
    container:{
        flex:1
        ,backgroundColor:"#B100FF"
    },
    bigCircle:{
        width:Dimensions.get('window').height*0.7,
        height:Dimensions.get('window').height*0.7,
        backgroundColor:"#035afc",
        borderRadius:1000,
        position:'absolute',
        right:Dimensions.get('window').width*0.25,
        top:-50
    },
    smallCircle:{
        width:Dimensions.get('window').height*0.4,
        height:Dimensions.get('window').height*0.4,
        backgroundColor:"#035afc",
        borderRadius:1000,
        position:'absolute',
        bottom:Dimensions.get('window').width*-0.2,
        right:Dimensions.get('window').width*-0.3,
    },
    centarizedView:{
        width :'100%',
        top :'20%',
        height:'75%'
    },
    Box:{
        width :'90%',
        height:'70%',
        backgroundColor:'#fafafa',
        borderRadius :20,
        alignSelf:'center',
        paddingHorizontal:15,
        paddingBottom:30,
        shadowColor:'#fff',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
    },
    logobox:{
        width :100,
        height :100,
        backgroundColor:'#fff',
        borderRadius :1000,
        alignSelf:'center',
        paddingHorizontal:14,
        paddingBottom:5,
        shadowColor:'#fff',
        display:"flex",
        alignItems:'center',
        justifyContent:'center',
        top:-50,
        marginBottom:-50,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:1
        },
        shadowOpacity:0.2,
        shadowRadius:1.41,
        elevation:2
    },
    commandButton:{
        padding:15,
        borderRadius:10,
        backgroundColor:"#59A52C",
        alignItems:'center',
        marginTop:10,
        marginBottom :30
    },
    panel:{
        padding:20,
        backgroundColor:"#FFFFFF",
        paddingTop:20
    },
    header:{
        backgroundColor:"#FFFFFF",
        shadowColor:"#333333",
        textShadowOffset:{width:-1,height:-3},
        shadowRadius:2,
        shadowOpacity:0.4,
        paddingTop:20,
        borderBottomLeftRadius:20,
        borderTopRightRadius:20
    },
    footer:{
        flex:1,
        backgroundColor:"#fff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30,
        margin:50,
        height:200
    },
    panelHeader:{
        alignItems:'center'
    },
    panelHandle:{
        width:40,
        height:8,
        borderRadius:4,
        backgroundColor:'#333333',
        marginBottom:10
    },
    panelTitle:{
        fontSize:27,
        height:35
    },
    panelSubtitle:{
        fontSize:14,
        color:'gray',
        height:30,
        marginBottom:10
    },
    panelButton:{
        padding:13,
        borderRadius:10,
        backgroundColor:"#FF6437",
        alignItems:'center',
        marginVertical:7
    },
    panelButtonTitle:{
        fontSize:17,
        fontWeight:'bold',
        color:'white'
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor:"#B100FF",
        paddingBottom:5
    },
    actionError:{
        flexDirection:"row",
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:"#FF0000",
        paddingBottom:5
    },
    textInput:{
        flex:1,
        paddingLeft:10,
        color:'#B100FF',
        alignItems:'flex-start'
    },
description:{
   height:50,
        paddingLeft:10,
        color:'#B100FF',
        flexDirection:'row',
        marginTop:10,
        marginBottom:10,
        borderWidth:1,
        alignItems:'flex-start',
        borderColor:"#B100FF",
        paddingBottom:5
}

})