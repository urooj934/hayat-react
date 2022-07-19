import React from "react";
import * as Animatable from 'react-native-animatable';
import { View ,Text ,TextInput,StyleSheet ,TouchableOpacity,Dimensions,Alert} from "react-native";
import { auth} from "../firebase/firebase";
const ForgotPassword=({navigation})=>{
    const[email,setEmail]=React.useState('');

    const resetPass=()=>{
        if(email==''){
 alert('Email required')
        }
 else{
    handlePasswordChange();
 }
    }
    const handlePasswordChange=()=>{
        auth.sendPasswordResetEmail(email).then(()=>{
         Alert.alert('Reset Password','Reset password email sent successfully');
         navigation.navigate('Login')
         })
        .catch((error)=>{
            alert(error.message);
        })}
    return(
<View style={styles.container}>
    <View style={styles.bigCircle} ></View>
    <View style={styles.smallCircle} ></View>
    <View style={styles.centarizedView} >
     <View style={styles.authBox}>
     <View style={styles.logobox}>
        <Animatable.Image source={require('../assets/logo.png')}
    animation="bounceIn"
    duration={1500}
    style={{width:100,height:100,borderRadius:90}}
    resizeMode='stretch'
    /></View>
    <Text style={styles.titleText}>Forgot Password?</Text>
    <Text>Enter your E-mail address we'll send you a link to reset your password</Text>
     <View style={styles.inputBox}>
     <Text style={styles.inputLabel}>Email</Text>
      <TextInput style={styles.input} keyboardType="email-address"
      placeholder="example@gmail.com" placeholderTextColor={'gray'} textContentType="emailAddress"
      value={email}
    onChangeText={text=>setEmail(text)}></TextInput>
      </View>
     <TouchableOpacity onPress={handlePasswordChange}style={styles.button}>
    <Text style={styles.textContinue}>Send Email </Text>  
    </TouchableOpacity>
    </View>
     </View>          
    </View>);
};
export default ForgotPassword;
const styles =StyleSheet.create({
    container:{
        flex:1,
        position :'relative' ,
        backgroundColor:"#B100FF"
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
        top :'25%'
    },
    authBox:{
        width :'90%',
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
    titleText:{
        fontSize:22,
        fontWeight:'bold',
        paddingHorizontal:60,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    inputBox:{
        marginTop:10,
        
    },
    inputLabel:{
        fontSize:18,
        marginBottom:6,
        paddingTop: 20
    },
    input:{ 
        color:"black",
        fontSize:20,
        width:'100%',
        borderRadius:4,
        backgroundColor:"#c5c8c9",
        fontSize:18,
        marginBottom:6,
        paddingHorizontal: 10,
        paddingVertical:12},
    button:{
        backgroundColor:"#59A52C",
        marginTop:10,
        paddingVertical:10,
        borderRadius:4
    },
    textContinue:{
        marginTop:5,
        fontSize :16,
        alignItems:'center',
        fontWeight:"bold",
        alignSelf :'center',
        color:"white"
    }

});