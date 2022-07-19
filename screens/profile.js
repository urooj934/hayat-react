import React,{useEffect} from "react";
import { View ,SafeAreaView,TouchableOpacity ,Dimensions,Share,Image} from "react-native";
import {Avatar ,Title,Caption,Text,TouchableRipple} from "react-native-paper"
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable"
import  FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather"
import { auth ,firestore} from "../firebase/firebase";
import LocalImage from '../assets/avatar.png';
import LottieView from "lottie-react-native";
const Profile =({navigation}) =>{
    const [loading,setLoading]=React.useState(null);
    const[userdata,setuserdata]=React.useState(null);
    const LocalImageUri = Image.resolveAssetSource(LocalImage).uri;
    const getuser =async()=>{
      await  firestore.collection("users").doc(auth.currentUser.uid).get()
        .then((documentSnapshot)=>{
            if(documentSnapshot.exists){
           setuserdata(documentSnapshot.data());
            } })
            setLoading(false);
    }
        const onShare = async () => {
          try {
            const result = await Share.share({
              message: 'https://exp.host/--/to-exp/exp%3A%2F%2F192.168.8.101%3A19000',
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
        
 }
    useEffect(()=>{
        getuser();
        navigation.addListener(`focus`,()=> setLoading(!loading));
         },[ navigation,loading]);
    return(
    <SafeAreaView style ={styles.container}>
   
    <View style={{flexDirection:'row' ,
    padding:20,
    Margin:5,
    justifyContent:'space-between',
    marginBottom:5,
    
    borderBottomColor:"#dddddd",
    borderBottomWidth:2,}}>
        <Animatable.Text animation="pulse" easing="ease-out"  iterationCount="infinite"
         style={{fontSize:20,color:'#B100FF',fontWeight:'bold'}}>HAYAT</Animatable.Text>
        <Animatable.Image source={require('../assets/logo.png')}
    animation="bounceIn"
    duration={1500}
    style={{borderRadius:25 ,width:40 ,height:40}}
    resizeMode='stretch'
    />
        </View>
        {loading?(<LottieView style={{height:100 ,width:100,alignSelf:'center'}}
source={require('../assets/loader.json')} autoPlay loop duration={3000}  />):(  <View> 
<View style={styles.userInfoSection}>
<View style={ {flexDirection:'row', marginTop:15,}}>
    <Avatar.Image source={{uri:userdata?userdata.userImg||LocalImageUri:LocalImageUri}} size={80}/>
    <View style={{marginLeft:20,marginTop:15}}>
        <Title style={styles.title}>{userdata?userdata.UserName:'-'}</Title>
        <Caption style={{color:"#59A52C"}}>id:{auth.currentUser?.uid}</Caption>
    </View>
    </View>
</View>
<View style={styles.userInfoSection}>
 <View style={styles.row}>
     <FontAwesome name="map-marker" size={20}/>
     <Text style={{marginLeft:20}}>{userdata?userdata.city:'-'} {userdata?userdata.country:'-'}</Text>
     </View>
     <View style={styles.row}>
     <FontAwesome name="phone" size={20}/>
     <Text style={{marginLeft:20}}>{userdata?userdata.phoneno:'-'}</Text>
     </View>
     <View style={styles.row}>
     <FontAwesome name="envelope" size={20}/>
     <Text style={{marginLeft:20}}>{auth.currentUser?.email}</Text>
     </View>
     </View>
     <View style={styles.infoBoxWrapper}>
          <View style={styles.infoBox}>
              <Title style={{textAlign:"center", color:"#B100FF", fontWeight:"bold"}}>User profile</Title>
          </View>
     </View>

     <View style={styles.menuWrapper}>
         <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
             <View style={styles.menuItem}>
             <Feather name="edit" color="#59A52C" size={20}/>
             <Text style={styles.menuItemText}>Edit Profile</Text>
             </View>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>navigation.navigate('Feedback')}>
             <View style={styles.menuItem}>
             <Feather name="message-square" color="#59A52C" size={20}/>
             <Text style={styles.menuItemText}>Feedback</Text>
             </View>
         </TouchableOpacity>
         <TouchableRipple onPress={()=>navigation.navigate('AboutUs')}>
             <View style={styles.menuItem}>
            <Feather name="info" color="#59A52C" size={20}/>
             <Text style={styles.menuItemText}>About Us</Text>
             </View>
         </TouchableRipple>
         <TouchableRipple onPress={onShare}>
             <View style={styles.menuItem}>
            <Feather name="share-2" color="#59A52C" size={20}/>
             <Text style={styles.menuItemText}>Tell your Friends</Text>
             </View>
         </TouchableRipple>
         <TouchableRipple onPress={()=>{auth.signOut(), navigation.navigate('Login')}}>
             <View style={styles.menuItem}>
             <Feather name="log-out" color="#59A52C" size={20}/>
             <Text style={styles.menuItemText}>Sign out</Text>
             </View>
         </TouchableRipple>
</View></View>)}

    </SafeAreaView>);
}
export default Profile;
const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
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
    userInfoSection:{
        paddingHorizontal:30,
        marginBottom:10,
       
    },
    title:{
        fontSize:24,
        fontWeight:"bold"
    },
    row:{
        flexDirection:'row',
        marginBottom:10
    },
    infoBoxWrapper:{
        borderBottomColor:'#dddddd',
        borderBottomWidth:2,
        borderTopColor:'#dddddd',
       borderTopWidth:2,
        flexDirection:'row',
        height:100,
    },
    infoBox:{
        width:"100%",
        alignItems:'center',
        justifyContent:'center'

    },
    menuWrapper:{
        flexDirection:'column',
        paddingVertical:10,
        paddingHorizontal:30
    },
    menuItem:{
flexDirection:'row',
paddingVertical:10,
paddingHorizontal:10
    },
    menuItemText:{
        color:"#777",
        marginLeft:20,
        fontWeight:'600',
        fontSize:16,
        lineHeight:26
    }
}) 