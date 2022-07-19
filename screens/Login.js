import React from "react";
import  Feather  from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import { View, KeyboardAvoidingView ,Text,Alert ,TextInput, StyleSheet ,TouchableOpacity,Dimensions,StatusBar,Button} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { auth } from "../firebase/firebase";
const Login =({navigation})=> {
    const [data ,setData] =React.useState({
        email:'',
        password:'',
        check_textInputChange :false,
        secureTextEntry :true
    })
    const[email,setEmail]=React.useState('');
    const[password,setPassword]=React.useState('');
    const handleSignIn =()=>{
     auth.signInWithEmailAndPassword(email, password).then(userCredentials=>{
        const user =userCredentials.user;
        navigation.navigate('Food1');     
    }).catch((error)=>{
       Alert.alert('Alert',error.message);
    })
}
    const textInputChange =(val)=>{
        if(val.length!=0){
            setData({
                ...data,
                email: val,
                check_textInputChange:true
            });
        }
        else{
            setData({
                ...data,
                email: val,
                check_textInputChange:false
            });
        }
    }
    const handlePasswordChange =(val)=>{
        setData({
            ...data,
            password: val,
        });
    }
    const updateSecureTextEntry=()=>{
        setData({
            ...data,
            secureTextEntry:!data.secureTextEntry
        });
    }
    
    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.bigCircle} ></View>
            <StatusBar style={{backgroundColor:"#B100FF"}}/>
        <View style={styles.header}>
            <Text style={styles.text_header}>LOGIN!</Text> 
            </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={styles.footerText}>Email</Text>
            <View style={styles.action}>
                <FontAwesome
                name="user"
                color="#05375A"
                size={20}/>
                <TextInput
                keyboardType="email-address"
                placeholder="Your Email"
                placeholderTextColor={'#c5c8c9'}
                style={styles.textInput}
                autoCapitalize="none"
                value={email}
                onChangeText={text=>setEmail(text)}/>
                {data.check_textInputChange ?
                <Animatable.View animation="bounceIn">
                <FontAwesome
                name="check-circle"
                color="green"
                size={20}/>
                </Animatable.View>
                :null}
                </View>
                <Text style={[styles.footerText ,{marginTop:15}]}>Password</Text>
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
                <View style={styles.button}>
                <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}
                    style={styles.forgotpass}>
                        <Text style={{color:"#035afc"}}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signin} onPress={handleSignIn}>
                        <Text style={[styles.textSign ,{color:"#fff"}]}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}
                    style={[styles.signin,{borderColor:"#009387" ,borderWidth:1,
                    backgroundColor:"#fff",
                    marginTop :15}]}>
                        <Text style={[styles.textSign ,{color:"#B100FF"}]}>Sign Up</Text>
                    </TouchableOpacity>
                   
                    </View>
         </Animatable.View>
            </KeyboardAvoidingView>
    );};
export default Login;
const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#B100FF",
    },
    header:{
        flex:1,
        justifyContent:'flex-end',
        paddingHorizontal:20,
        paddingBottom:50
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
    footer:{
        flex:3,
        backgroundColor:"#fff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30,
    },
    footerText:{
        marginTop:12,
        color:'#05375A',
        fontSize:18
    },
    text_header:{
       color:'#fff',
       fontWeight:'bold',
       fontSize:30
    },
    text_footer:{
        color:'#B100FF',
        fontSize:20
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:'#B100FF',
        paddingBottom:5
    },
    textInput:{
        flex:1,
        paddingLeft:10,
        color:'#B100FF'
    },
    button:{  
        alignItems:"center",
        marginTop:10
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
    forgotpass:{
        borderRadius:30,
        marginTop:2,
        marginBottom:20,
        width:'100%',
        height:20,
        justifyContent:"center",
        alignItems:"flex-end",
       borderRadius:10
    },
    textSign:{
        fontSize :18,
        alignContent:"center",
        color:"white",
        fontWeight:'bold'
    }
});