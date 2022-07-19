import React, {useEffect,useState} from 'react';
import { View,Text,TouchableOpacity,Image,ImageBackground,TextInput,StyleSheet,Modal,Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from "react-native-reanimated";
import * as ImagePicker from 'expo-image-picker'
import { auth, firestore } from '../firebase/firebase';
import 'firebase/storage';
import * as firebase from "firebase";
import LocalImage from '../assets/avatar.png';
const EditProfile=({navigation})=>{   
// const [hasGalleryPermission,setHasGalleryPermission] = useState(null);
const LocalImageUri = Image.resolveAssetSource(LocalImage).uri;
 const [uploading, setUploading] = useState(false);
 const [transferred, setTransferred] = useState(0);
 const [image ,setImage]= useState(null);
 const [userData,setUserData]=useState(null);
 const[visible ,setVisible]=useState('');
 const  bs =React.useRef();
  const  fall=new Animated.Value(1);
 let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    } 
    

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true});
      setImage(pickerResult.uri); 
      bs.current.snapTo(1);
}
let openCameraAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    const imageUri = pickerResult.uri;
    setImage(imageUri); 
    bs.current.snapTo(1);
  }
    const getuser =async()=>{
   const currentUser =   await  firestore.collection("users").doc(auth.currentUser.uid).get()
        .then((documentSnapshot)=>{
            if(documentSnapshot.exists){
             //   console.log('UserData' , documentSnapshot.data());
           setUserData(documentSnapshot.data());
            } })}
 const handleUpdate= async ()=>{
   let imageUrl =await uploadimg();
   if(imageUrl==null && userData.userImg){
    imageUrl=userData.userImg;
   }
   await firestore.collection("users").doc(auth.currentUser.uid).update({
        UserName:userData.UserName,
        phoneno:userData.phoneno,
        country:userData.country,
        city:userData.city,
        userImg: imageUrl,
        
    })
    .then(()=>{
Alert.alert('Profile Update','Profile updated successfully');
navigation.navigate('Food');
         })}
         
 const handleDelete= async()=>{
    deletedonatefood();
    await firestore.collection("donateobject").where('uid', '==', auth.currentUser.uid).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
        var id=doc.id;
          console.log(doc.id, " => ", doc.data());
 //     }); 
   firestore.collection("donateobject").doc(id).delete();
        })
       
} )
await firestore.collection("ReqFood").where('uid', '==', auth.currentUser.uid).get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    var id=doc.id;
      console.log(doc.id, " => ", doc.data());
//     }); 
firestore.collection("ReqFood").doc(id).delete();
    })
   
} )
await firestore.collection("Reqobjects").where('uid', '==', auth.currentUser.uid).get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    var id=doc.id;
      console.log(doc.id, " => ", doc.data());
//     }); 
firestore.collection("Reqobjects").doc(id).delete();
    })
    var donatefood = firestore.collection('donatefood').where('uid','==',auth.currentUser.uid);
donatefood.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  });
});
   
} )

await  firestore.collection("users").doc(auth.currentUser.uid).delete().then(()=>{
    auth.currentUser.delete();})   

navigation.navigate('Login');
alert('delete successfull') ;
}
const deletedonatefood= async ()=>{
    await firestore.collection("donatefood").where('uid', '==', auth.currentUser.uid).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
        var id=doc.id;
          console.log(doc.id, " => ", doc.data());
    //     }); 
    firestore.collection("donatefood").doc(id).delete().then(()=>{
        alert('post deleted successfully');
    });
        })
       
    } )
}
 
 useEffect(()=>{
    getuser();
     },[]);
/* useEffect(()=>{
     (async()=>{
         const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
         setHasGalleryPermission(galleryStatus.status==='granted');
     }
     )();
},[]);
  const pickImage = async()=>{
     let result =await ImagePicker.launchImageLibraryAsync({
         mediaTypes : ImagePicker.MediaTypeOptions.Images,allowsEditing:true,
         aspect:[4,3],
         quality:1
     });
     console.log(result);
     if(!result.cancelled){
         setImage(result.uri);
         this.bs.current.snapTo(1)
     }};
     if(hasGalleryPermission===false){
          Alert.alert('Permissions', 'media permission granted', [
            {
              text: 'okay',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]);
  }
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
      setImage(result.uri)
    }
  }
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
      setImage(result.uri)
    }
  }*/
 
 const   renderinner=()=>(
        <View style={styles.panel}>
            <View style={{alignItems:"center"}}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose your profile picture</Text>
                <TouchableOpacity style={styles.panelButton} onPress={openCameraAsync}>
                    <Text style={styles.panelButtonTitle}> Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.panelButton} onPress={openImagePickerAsync}>
                    <Text style={styles.panelButtonTitle}>Upload from gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.panelButton} onPress={()=> bs.current.snapTo(1)}>
                    <Text style={styles.panelButtonTitle}> Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
const   renderheader =()=>(
<View style={styles.header}>
<View style={styles.panelHeader}>
<View style={styles.panelHandle}>  
    </View>
    </View>
</View>
    );
   const uploadimg = async () => {
        if(image==null){
            return null;
        }
        const uploadUri = image;
        const response = await fetch(uploadUri)
        const blob = await response.blob();

        let filename = uploadUri.substring(uploadUri.lastIndexOf('/')+1);
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        var storageref = firebase.storage().ref().child(`photos/${filename}`);
        setUploading(true);
        setTransferred(0);
        const task  = storageref.put(blob);

        //set transferred state
        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *100
              );
          });

    try{
        await task;
        const url = await storageref.getDownloadURL();
        setUploading(false);
        return url;

    }catch(e){
        console.log(e).then(() => {
            alert('Oops!','something went wrong');
           });
        //return null;
      }
      setImage(null);
     }
    return(
       
    <View style={styles.container}>
    
         <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderinner}
        renderHeader={renderheader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        />
         <View style={{margin:30 }}>
        <View style={styles.view}>
        <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
        <View style={{height:100,width:100,
        borderRadius:15,justifyContent:'center',alignItems:'center'}}>
            <ImageBackground source={{uri:image?image:userData?userData.userImg||LocalImageUri:LocalImageUri}}
             style={{height:100,width:100}} imageStyle={{borderRadius:15}}>
             <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Icon name="camera" size={70} color="#fff"
                    style={{opacity:1,alignItems:"center",justifyContent:'center'
                    ,borderWidth:1,borderRadius:10,borderColor:"#fff"}}/>
                </View>
                </ImageBackground>
                    </View>
                </TouchableOpacity>
                <Text style={{marginTop:10,fontSize:18,fontWeight:'bold',color:'white'}}>Display Image</Text>
        </View>  
        </View>
        <View style={styles.footer}>
  <View style={styles.action}>
  <FontAwesome name="user" size={20} color="#05375A"/>
  <TextInput placeholder="UserName" placeholderTextColor={'#c5c8c9'} 
  style={styles.textInput} value={userData?userData.UserName:''}
  onChangeText={(text)=>setUserData({...userData,UserName:text})}></TextInput>
  </View>
  <View style={styles.action}>
  <FontAwesome name="phone" size={20} color="#05375A"/>
  <TextInput placeholder="Phone-no" keyboardType="number-pad" placeholderTextColor={'#c5c8c9'}
  style={styles.textInput} value={userData?userData.phoneno:''} onChangeText={(text)=>setUserData({...userData,phoneno:text})}></TextInput>
  </View>
  <View style={styles.action}>
  <FontAwesome name="globe" size={20} color="#05375A"/>
  <TextInput placeholder="Country" placeholderTextColor={'#c5c8c9'}
  value={userData?userData.country:'-'} onChangeText={(text)=>setUserData({...userData,country:text})}
  style={styles.textInput}></TextInput>
  </View>
  <View style={styles.action}>
  <FontAwesome name="map-pin" size={20} color="#05375A"/>
  <TextInput placeholder="City" placeholderTextColor={'#c5c8c9'}
  style={styles.textInput} value={userData?userData.city:''}
  onChangeText={(text)=>setUserData({...userData,city:text})}></TextInput>
  </View>
  <TouchableOpacity style={styles.deleteacc} onPress={()=>setVisible(true)}>
    <Text style={{color:"#035afc" ,fontWeight:'bold',fontSize:17,fontStyle:'italic'}}>Delete account?</Text>
  </TouchableOpacity>
  <Modal transparent visible={visible} animationType='fade'>
    <View style={styles.modalBackground}>
     <View style={styles.modalContainer}>
        <Image style={{width:80, height:80,marginTop:30}} source={require('../assets/warning.png')}/>
            <Text style={styles.titleText}> Delete Account!</Text>
            <Text style={{color:"#05375A",fontSize:14,marginTop:10}}>Deleting your account is permanant , your data cannot be recovered</Text>
             <Text style={{color:"#05375A",fontSize:18,marginTop:10}}>Are you sure you want to delete account?</Text>
                <View style={{flexDirection:'row'}}> 
                    <TouchableOpacity style={styles.delete} onPress={handleDelete}>
                          <Text style={{color:'#ad1515',fontWeight:'bold',fontSize:20}}>  yes  </Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.cancel} onPress={()=>{setVisible(false)}}>
                          <Text style={{color:"#05375A",fontWeight:'bold',fontSize:20}}>cancel</Text>
                       </TouchableOpacity>
                </View>
     </View>
    </View>
  </Modal>
  <TouchableOpacity style={styles.commandButton} onPress={handleUpdate}>
    <Text style={styles.panelButtonTitle}>Update</Text>
  </TouchableOpacity>
  </View>
    </View>);
}
export default EditProfile;
const styles =StyleSheet.create({
    container:{
        flex:1
        ,backgroundColor:"#B100FF"
    },
    view:{
  alignItems:'center'
    },
    commandButton:{
        padding:15,
        borderRadius:10,
        backgroundColor:"#59A52C",
        alignItems:'center',
        marginTop:10
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
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    footer:{
        flex:2,
        backgroundColor:"#fff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30,
    },
    panelHeader:{
        alignItems:'center'
    },
    panelHandle:{
        width:40,
        height:8,
        borderRadius:4,
        backgroundColor:'#00000040',
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
        backgroundColor:"#B100FF",
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
        color:'#B100FF'
    },
    deleteacc:{
        borderRadius:30,
        marginTop:2,
        marginBottom:20,
        width:'100%',
        height:20,
        justifyContent:"center",
        alignItems:"flex-end",
       borderRadius:10,

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
        paddingHorizontal:60,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    delete :{
        padding:13,
        borderRadius:10,
        borderWidth:1,
        backgroundColor:"white",
        alignItems:'center',
        marginVertical:7,
        marginRight:25,
        marginTop:30,
        borderColor: "#05375A",
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9, 
    },
    cancel :{
        padding:13,
        borderRadius:10,
        marginTop:30,
        backgroundColor:"white",
        alignItems:'center',
        marginVertical:7,
        borderWidth:1,
        fontSize:17,
        fontWeight:'bold',   
        borderColor: "#05375A",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    }
    }
)