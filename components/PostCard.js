import React ,{useEffect}from "react";
import {View ,Text ,StyleSheet,Image} from'react-native' ;
import {firestore} from "../firebase/firebase";
import LocalImage from '../assets/avatar.png';
const PostCard =({item})=>{
  const[userdata,setuserdata]=React.useState(null);
  const LocalImageUri = Image.resolveAssetSource(LocalImage).uri;
  const getuser =async()=>{
    await  firestore.collection("users").doc(item.uid).get()
      .then((documentSnapshot)=>{
          if(documentSnapshot.exists){
         setuserdata(documentSnapshot.data());
          } })
  }
  useEffect(()=>{
    getuser();
    
     },[]);
 return( 
    <View style={styles.card}>
    <View style={styles.userInfo}>
        <Image style={styles.userImage} source={{uri:userdata?userdata.userImg ||LocalImageUri:LocalImageUri}}></Image>
        <View style={styles.userInfoText}>
            <Text style={styles.userName}>{userdata?userdata.UserName ||'-':'-'}</Text>
            <Text style={styles.location}>location :{userdata?userdata.city:'-'} {userdata?userdata.country:'-'} </Text>
            <Text style={styles.location}>category : {item.category}</Text>
            </View>
    </View>
    <View style={styles.divider}></View>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.postText}>{item.desc}</Text>
     </View>)  ;
};
export default PostCard;
const styles =StyleSheet.create({
  card:{
    backgroundColor:'#f8f8f8',
    width:'100%',
    marginBottom:20,
    borderRadius:20,
    paddingBottom:10
    },
    userInfo:{
      flexDirection:'row',
      justifyContent:'flex-start',
      padding:15,
   
    },
    userImage:{
    width:50,
    height:50,
    borderRadius:25,
    },
    userInfoText:{
      flexDirection:'column',
      justifyContent:'center',
      marginLeft:10
    },
    userName:{
    fontSize:14,
    fontWeight:'bold',
        
    },
    location :{
      fontSize:12,
      color:'#666'
    },
    divider:{
      borderBottomColor:"#dddddd",
      borderBottomWidth:1,
      width:"90%",
      alignSelf:"center",
      marginBottom:10
    },
    postText:{
    fontSize:14,
    paddingLeft:15,
    paddingRight:15
    },
    postImage:{
    width:'100%',
    height:250,
    marginTop:15
    },
    title :{
      fontSize:14,
      fontWeight:'bold',
      paddingLeft:15,
      paddingRight:15
    }
})