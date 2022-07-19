import React, { useEffect } from "react";
import * as Device from 'expo-device';
import  Feather  from "react-native-vector-icons/Feather";
import LottieView from "lottie-react-native";
import * as Animatable from 'react-native-animatable';
import { View ,KeyboardAvoidingView,Text,ScrollView,Modal,Image ,TextInput, StyleSheet ,TouchableOpacity,Dimensions ,StatusBar} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Notifications from 'expo-notifications';
import { auth ,CreateUserDocument, firestore,FirebaseUser} from "../firebase/firebase";
const Signup =({navigation})=> {
    const [data ,setData] =React.useState({
        email:'',
        password:'',
        check_textInputChange :false,
        confirm_password:'',
        secureTextEntry :true,
        confirm_secureTextEntry :true
    })
    const[email,setEmail]=React.useState('');
    const[password,setPassword]=React.useState('');
    const[UserName,setuserName]=React.useState('');
    const[phoneno,setPhoneno]=React.useState('') ;
    const[city,setcity]=React.useState('') ;
    const[country,setCountry]=React.useState('') ;
    const[pushtoken,setPushtoken]=React.useState('') ;
    const[Confirm_password,setConfirmPassword]=React.useState('');
    const[visible,setVisible]=React.useState('');
    useEffect(()=>{
       registerForPushNotificationsAsync();
         },[]);
    const handleSignUp=()=>{
        if(UserName==''||password==''||email==''||phoneno==''||city==''||country==''||Confirm_password==''){
            alert("Fill the form correctly");   
        }
        else if(password!=Confirm_password){
            alert("passwords do not match");
        }
        else{
        auth.createUserWithEmailAndPassword( email, password).then(()=>{
         //  auth.currentUser.sendEmailVerification();
         firestore.collection("users").doc(auth.currentUser.uid).set({
             uid:auth.currentUser.uid,
             UserName,phoneno,city,country ,
             email:email,
             expotoken:pushtoken,
            userImg: null, createdAt:new Date(),
         })
         setVisible(true);
        })
        .catch((error)=>{
            alert(error.message);
        })}
    }
   const registerForPushNotificationsAsync = async () => {
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
          setPushtoken(token);
         // this.setState({ expoPushToken: token });
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
        };
    const textInputChange =(value)=>{
        if(value.length!=0){
            setEmail({
                ...email,
                email: value,
                check_textInputChange:true
            });
        }
        else{
            setEmail({
                ...email,
                email: value,
                check_textInputChange:false
            });
        }
    }
    const handlePasswordChange =(val)=>{
        setPassword({
            ...data,
            password: val,
        });
    }
    const handleConfirmPasswordChange =(val)=>{
        setData({
            ...data,
           confirm_password : val,
        });
    }
    const updateSecureTextEntry=()=>{
        setData({
            ...data,
            secureTextEntry:!data.secureTextEntry
        });
    }
    const updateConfirmSecureTextEntry=()=>{
        setData({
            ...data,
            confirm_secureTextEntry:!data.confirm_secureTextEntry
        });
    }
    
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.bigCircle} ></View>
        <View style={styles.header}>
        <Text style={styles.text_header}>Register!</Text> 
            </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>
        <Text style={styles.text_footer}>User Name</Text>
            <View style={styles.action}>
                <FontAwesome
                name="user"
                color="#05375A"
                size={20}/>
                <TextInput
                placeholder="User Name Here"
                placeholderTextColor={'#c5c8c9'}
                style={styles.textInput}
                autoCapitalize="none"
                value={UserName}
                onChangeText={text=>setuserName(text)}/>
                </View>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome
                name="envelope"
                color="#05375A"
                size={20}/>
                <TextInput
                placeholder="your Email Here"
                style={styles.textInput}
                autoCapitalize="none"
                value={email}
                onChangeText={text=>setEmail(text)}
                placeholderTextColor={'#c5c8c9'}/>
                {email.check_textInputChange ?
                <Animatable.View animation="bounceIn">
                <FontAwesome
                name="check-circle"
                color="green"
                size={20}/>
                </Animatable.View>
                :null}
                </View>
                <Text style={styles.text_footer}>Phone no</Text>
            <View style={styles.action}>
                <FontAwesome
                name="phone"
                color="#05375A"
                size={20}/>
                <TextInput
                placeholder="Phone no Here"
                style={styles.textInput}
                autoCapitalize="none"
                placeholderTextColor={'#c5c8c9'}
                value={phoneno}
                onChangeText={Number=>setPhoneno(Number)}/>
                </View>
                <Text style={styles.text_footer}>City</Text>
            <View style={styles.action}>
                <FontAwesome
                name="map-marker"
                color="#05375A"
                size={20}/>
                <TextInput
                placeholder="Enter City"
                style={styles.textInput}
                autoCapitalize="none"
                placeholderTextColor={'#c5c8c9'}
                value={city}
                onChangeText={text=>setcity(text)}/>
                </View>
                <Text style={styles.text_footer}>Country</Text>
            <View style={styles.action}>
                <FontAwesome name="globe" size={20} color="#05375A"/>
                <TextInput
                 placeholder="Enter Country"
                 placeholderTextColor={'#c5c8c9'}
                 style={styles.textInput}
                 autoCapitalize ='none'
                 value={country}
                 onChangeText={text=>setCountry(text)}/>
                 </View>
                <Text style={styles.text_footer}>Password</Text>
            <View style={styles.action}>
                <FontAwesome
                name="lock"
                color="#05375A"
                size={20}/>
                <TextInput
                placeholder="Your Password"
                placeholderTextColor={'#c5c8c9'}
                secureTextEntry={data.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                value={password}
                onChangeText={text=>setPassword(text)}/>
                <TouchableOpacity onPress={updateSecureTextEntry}>
                    {data.secureTextEntry ?
                <Feather
                name="eye-off"
                color="grey"
                size={20}/>
                :  <Feather
                name="eye"
                color="grey"
                size={20}/>}</TouchableOpacity>
                </View>
                <Text style={styles.text_footer}>Confirm Password</Text>
                <View style={styles.action}>
                <FontAwesome
                name="lock"
                color="#05375A"
                size={20}/>
                <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={'#c5c8c9'}
                secureTextEntry={data.confirm_secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
               // value={Confirm_password}
                onChangeText={val=>setConfirmPassword(val)}/>
                <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                    {data.confirm_secureTextEntry ?
                <Feather
                name="eye-off"
                color="grey"
                size={20}/>
                :  <Feather
                name="eye"
                color="grey"
                size={20}/>}</TouchableOpacity>
                </View>
                </ScrollView>
                <Modal transparent visible={visible} animationType='fade'>
                <View style={styles.modalBackground}>
                   <View style={styles.modalContainer}>
                   <TouchableOpacity style={{marginLeft:'90%'}} onPress={()=>navigation.navigate('Login')}>
                        <Image style={{width:15, height:15,marginTop:10}} source={require('../assets/cross.png')}/>
                         </TouchableOpacity>
                       
                    <LottieView source={require('../assets/greenTick.json')} autoPlay
                     style={{width:'70%',marginRight:'50%',marginLeft:'40%',height:'70%',justifyContent:'center',alignItems:'center'}}/>
                  
                     <Text style={styles.titleText}> Signup Successful!</Text>
                     <Text style={{color:"#05375A",fontSize:16,marginBottom:20}}> follow link to verify your E-mail</Text>
                </View>
                </View>
                </Modal>
                <View style={styles.button}>
                <TouchableOpacity onPress={handleSignUp}
                    style={styles.signin}>
                        <Text style={[styles.textSign ,{color:"#fff"}]}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.signin,{borderColor:"#009387" ,borderWidth:1,
                    backgroundColor:"#fff",
                    marginTop :5}]} onPress={()=>navigation.navigate('Login')}>
                        <Text style={[styles.textSign ,{color:"#B100FF"}]}>Sign In</Text>
                    </TouchableOpacity>
                    
                    </View>
         </Animatable.View>
            </KeyboardAvoidingView>
    );};
export default Signup;
const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#B100FF"
    },
    header:{
        flex:1,
        justifyContent:'flex-end',
        paddingHorizontal:20,
        paddingBottom:40
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
    text_header:{
        color:'#fff',
        fontWeight:'bold',
        marginTop:10,
        paddingTop:10,
        fontSize:30
     },
    footer:{
        flex:10,
        backgroundColor:"#fff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:10,
    },
    text_footer:{
        marginTop:8,
        color:'#05375A',
        fontSize:14
    },
    action:{
        flexDirection:'row',
        marginTop:6,
        borderBottomWidth:1,
        borderBottomColor:'#B100FF',
        paddingBottom:4
    },
    textInput:{
        flex:1,
        paddingLeft:10,
        color:'#B100FF',
        marginBottom:10
    },
    button:{  
        alignItems:"center",
        marginTop:20
    },
    signin:{
        backgroundColor:"#59A52C",
        borderRadius:30,
        marginTop:10,
        width:'100%',
        height:50,
        justifyContent:"center",
        alignItems:"center",
       borderRadius:10
    },
    textSign:{
        alignContent:"center",
        color:"white",
        fontWeight:'bold'
    },
    modalBackground:{
        flex :1,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    modalContainer:{
        height:'60%',
        width :'80%',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'white',
        paddingHorizontal:20,
        paddingVertical:20,
        borderRadius:20,
        elevation:20
    },
    titleText:{
        fontSize:22,
        fontWeight:'bold',
        paddingHorizontal:30,
        marginBottom:10,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
    },
});