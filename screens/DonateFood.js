import React ,{useState} from "react";
import { View,Alert,Text,TouchableOpacity,ImageBackground,Dimensions,TextInput,StyleSheet,KeyboardAvoidingView, ScrollView  } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, { set } from "react-native-reanimated";
import * as ImagePicker from 'expo-image-picker';
import { auth ,firestore} from "../firebase/firebase";
import 'firebase/storage';
import * as firebase from "firebase";
//import "../firebase/firebase";

const DonateFood=({navigation})=>{
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [title,setTitle]=React.useState('');
    const [desc,setDesc]=React.useState('');
    const [phoneno,setPhoneno]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [address,setAddress]=React.useState('');
    //const firestore = firebase.firestore();
    const bs=React.useRef();
    const fall= new Animated.Value(1);
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
         bs.current.snapTo(1) ;
      }
    
    const renderinner = () => (
        <View style={styles.panel}>
            <View style={{alignItems: "center"}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose picture</Text>
            <TouchableOpacity style={styles.panelButton} onPress={openCameraAsync}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={openImagePickerAsync}>
                <Text style={styles.panelButtonTitle}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={cancel}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
</View>
        </View>
      
    );
    const renderheader = () => (
    <View style={styles.header}>
        <View style={styles.panelHeader}>
            <View style={styles.panelHandle}>
            </View>
        </View>
    </View>
    
    );
    const cancel=()=>{
        setImage(null);
        bs.current.snapTo(1);
    }
    const handlefooddonation=()=>{
        if (title==''||desc==''||category==''||phoneno=='' ){
            alert('submit fields');
        }
        else if(image==null){
            alert('image required');
        }
        else{
        createdonateFoodDocument(title,desc,category,phoneno,address,);}
        }
        const createdonateFoodDocument =async (title,desc,category,phoneno,address)=>{
            const imageUrl = await uploadimg();
        console.log('Image Url: ', imageUrl);
            const donatefood = await firestore.collection('donatefood').doc();
            try{
              donatefood.set({
                uid :auth.currentUser.uid,
                title,
                desc,
                category,
                phoneno,
                location:null,
                createdAt:new Date(),
                postImg: imageUrl,
              }).then(() => {
                navigation.navigate('MapDf');
                //Alert.alert('submitted','request submitted');
                setTitle(null);
               setDesc(null);
               setPhoneno(null);
               setCategory(null);
               setImage(null);
               });
               
            }
            catch(error){
                console.log(error).then(() => {
                    alert('Oops!','something went wrong');
                   });
            }}

    const uploadimg = async () => {
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
        snapPoints={[330,0]}
        renderContent={renderinner}
        renderHeader={renderheader}
        initialSnap={1}
        callbackNode={fall}
        enabledHeaderGestureInteraction={true}
        />
        <View style={styles.bigCircle} ></View>
    <View style={styles.smallCircle} ></View>
    <View style={styles.footer}>
    <Text style={{fontSize:15,
     color:"#666666",fontWeight:'bold'}}>Donate Food</Text>
         <Animated.View style={{marginTop:30, opacity: Animated.add(0.3,Animated.multiply(fall,1.0)) }}>
        <View style={styles.view}>
        <TouchableOpacity onPress={()=>bs.current.snapTo(0)}>
        <View style={{height:100,width:100,
        borderRadius:15,justifyContent:'center',alignItems:'center',marginTop:20,borderColor:"black",borderWidth:1}}>
            <ImageBackground  source={{uri:image}} 
            //source={require('../assets/noimage.png')}
             style={{height:100,width:100}} imageStyle={{borderRadius:15}}>
             <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Icon name="camera" size={35} color="#c5c8c9"
                    style={{opacity:0.7,alignItems:"center",
                    justifyContent:'center'
                    ,borderWidth:1,borderRadius:10,borderColor:"#c5c8c9"}}/>
             </View>
                </ImageBackground>
                    </View>
                </TouchableOpacity>
                <Text 
                style={{marginTop:10,fontSize:15,fontWeight:'bold' ,color:'#5c5c5c',paddingBottom:10}}>
                    image here</Text>
        </View>  
        </Animated.View>
        <View style={styles.divider}></View>
            <ScrollView style={{marginBottom:30,padding:15}}>
            <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
  <View style={styles.action}>
  <FontAwesome name="edit" size={20} color="#05375A"/>
  <TextInput placeholder="Title" placeholderTextColor={'#c5c8c9'}
  value={title}
  onChangeText={value=>setTitle(value)}
  style={styles.textInput}>
  </TextInput>
  </View>

  <View style={styles.description}>
  <FontAwesome name="align-left" size={30} color="#05375A"/>
  <TextInput placeholder="Donation details "  placeholderTextColor={'#c5c8c9'}
  value={desc}
  onChangeText={value=>setDesc(value)}
  style={styles.textInput }>
  </TextInput>
  </View>

  <View style={styles.action}>
  <FontAwesome name="phone" size={20} color="#05375A"/>
  <TextInput placeholder="Your Phone-no" keyboardType="number-pad" placeholderTextColor={'#c5c8c9'}
  value={phoneno}
  onChangeText={value=>setPhoneno(value)}
  style={styles.textInput}>
  </TextInput>
  </View>

  <View style={styles.action}>
  <FontAwesome5 name="layer-group" size={20} color="#05375A"/>
  <TextInput placeholder="Category (cooked or uncooked)" placeholderTextColor={'#c5c8c9'}
  value={category} autoCorrect={false}
  onChangeText={value=>setCategory(value)}
  style={styles.textInput}>
  </TextInput>
  </View>
  </KeyboardAvoidingView>
  </ScrollView>
  <TouchableOpacity style={styles.commandButton} onPress={handlefooddonation}>
    <Text style={styles.panelButtonTitle}>Donate</Text>
  </TouchableOpacity>
  </View> 
    </View>);
}

export default DonateFood;
const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#B100FF",
        position :'relative' ,
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
    view:{
  alignItems:'center'
    },
    commandButton:{
        padding:15,
        borderRadius:10,
        backgroundColor:"#59A52C",
        alignItems:'center',
        marginTop:5
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
        flex:1,
        backgroundColor:"#fff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30,
        margin:40,
        height:300
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
    divider:{
        borderBottomColor:"#dddddd",
        borderBottomWidth:1,
        width:"90%",
        alignSelf:"center",
        marginBottom:10
      },
    action:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor:"#B100FF",
        paddingBottom:2
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