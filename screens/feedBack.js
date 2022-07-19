import React, { useEffect } from "react";
import { auth, firestore} from "../firebase/firebase";
import * as Animatable from 'react-native-animatable';
import LottieView from "lottie-react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5'
import { View ,Text,StyleSheet ,TouchableOpacity,TextInput, Alert} from "react-native";
const Feedback=({navigation})=>{
    const[userName,setUserName]=React.useState('');
        const[email,setEmail]=React.useState('');
    const[feedback,setfeedback]=React.useState('') ;
    const[userdata,setuserdata]=React.useState(null);
    const getuser =async()=>{
      await  firestore.collection("users").doc(auth.currentUser.uid).get()
        .then((documentSnapshot)=>{
            if(documentSnapshot.exists){
           setuserdata(documentSnapshot.data());
            } })
    }
    useEffect(()=>{
       getuser();
        },[]);
       
    const handleFeedback=()=>{
        if(userName==''||email==''||feedback==''){
            alert('Kindly fill all fields')
        }
        else{
       
            createFeedbackDocument(userName,email,feedback);
        }
            }

      //  )
       // .catch((error)=>{
       //     alert(error.message);
       // })
    const createFeedbackDocument =async (userName,email,feedback)=>{
          const feed = await firestore.collection('feedback').doc();
          try{
            feed.set({
                id:auth.currentUser.uid,
                userName ,
                email,
                feedback,
                createdAt:new Date(),
            });
            Alert.alert('Thankyou','Feedback submitted successfully')
            navigation.navigate('Food1');
          }
          catch(error){
            alert(error.message);
          }
      
     //   }
      //  
        }
    return(<View style={styles.container}>
        <View style={styles.header}>
        <View style={{width:250 ,height:250}}>
<LottieView  style={{marginTop:2}}
source={require('../assets/feedback.json')} autoPlay loop duration={1500}/>
</View>
        </View>
        <Animatable.View style={styles.footer}
         animation="fadeInUpBig" duration={1500}>
            <Text style={styles.title} >Your Feedback here</Text>
            <View style={styles.action}>
                <FontAwesome
                name="user"
                color="#05375A"
                size={20}/>
                <TextInput
                keyboardType="default"
                placeholder="Your Name"
                placeholderTextColor={'#c5c8c9'}
                value={userName}
                onChangeText={text=>setUserName(text)}
                style={styles.textInput}>
                </TextInput></View>
                <View style={styles.action}>
                <FontAwesome
                name="envelope"
                color="#05375A"
                size={20}/>
                <TextInput
                placeholderTextColor={'#c5c8c9'}
                keyboardType="email-address"
                placeholder="Email here"
                value={email}
                onChangeText={text=>setEmail(text)}
                style={styles.textInput}
                /></View>
                <View style={styles.feedback}>
                <FontAwesome5
                name="comments"
                color="#05375A"
                
                size={20}/>
                <TextInput
                placeholderTextColor={'#c5c8c9'}
                value={feedback}
                onChangeText={value=>setfeedback(value)}
                placeholder="Enter your opinion here"
                style={styles.textInput}
                /></View>
        <Text style={styles.text2}>ThankYou ..</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={handleFeedback}>
                <View style={styles.signin}>
                    <Text style={styles.textSign}>Submit </Text>
                    <MaterialIcons
                    name="navigate-next"
                    color='#fff'
                    size={30}
                    /></View>   
            </TouchableOpacity>
            </View>
            </Animatable.View>
        </View>);
}
export default Feedback;
const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#B100FF"
    },
    header:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        flex:2,
        backgroundColor:"#fff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:50,
        paddingHorizontal:30,
    },
    title:{
        color:'#B100FF',
        fontSize:30,
        fontWeight:"bold"
    },
    text:{
        color:"#2F3D66",
        fontSize:13,
        fontWeight:"bold",
        marginTop:5
    },
    text2:{
        color:'#B100FF',
        fontSize:19,
        fontWeight:"bold",
        marginTop:20
    },
    button:{
        
        alignItems:"flex-end",
        borderRadius:30,
        marginTop:1
    },
    signin:{
        backgroundColor:"#59A52C",
        alignItems:"flex-end",
        borderRadius:30,
        marginTop:30,
        width:150,
        height:40,
        justifyContent:"center",
        alignItems:"center",
       borderRadius:50,
       flexDirection:"row"
    },
    textSign:{
        alignContent:"center",
        color:"white",
        fontWeight:'bold'
    },
    action:{
        height:40,
        alignItems:'center',
        paddingLeft:5,
        flexDirection:'row',
        marginTop:10,
        borderWidth:1,
        borderColor:'#B100FF',
        paddingBottom:5
    },
    textInput:{
        flex:1,
        paddingLeft:10,
        color:'#B100FF',
       
    },
feedback:{
    height:170,
    alignItems:'flex-start',
    paddingLeft:5,
    flexDirection:'row',
    marginTop:10,
    borderWidth:1,
    borderColor:'#B100FF',
    paddingBottom:5
}
});
