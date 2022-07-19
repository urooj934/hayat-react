import React, { useState, useEffect } from 'react';
import MapView,{Callout, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StyleSheet, Text, View, Dimensions, TextInput,TouchableOpacity,Alert,KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { auth ,firestore} from "../firebase/firebase";
const Map=({navigation})=>{
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const[userdata,setuserdata]=React.useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pin, setPin] = useState({latitude: 	32.1877,
    longitude: 74.1945,
    latitudeDelta: 0.0999,
      longitudeDelta: 0.0999,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setPin({latitude:location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 1,
      longitudeDelta: 1,
})
      console.log(location);
      let currentlocation = await Location.reverseGeocodeAsync(location.coords);
      setLocation( currentlocation[0].streetNumber+","+currentlocation[0].street+","+currentlocation[0].region+","+currentlocation[0].city+","+currentlocation[0].country);
     console.log(currentlocation);
    })();
    getuser();
  }, []);
 //const getmaploc= async(lat,lng)=>{
  
 // await  Geocoder.fallbackToGoogle(api);
 
  // use the lib as usual
//  let ret = await Geocoder.geocodePosition({lat, lng});
//      let address=(ret[0].formattedAddress);
//      setAddress(address);
//     console.log(address);
 //}
 
  let text;
  let loc ;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    //loc=JSON.stringify(currentlocation);
  }
 //let obj =JSON.parse(text);
//console.log(obj);

    const getuser =async()=>{
      await  firestore.collection("users").doc(auth.currentUser.uid).get()
        .then((documentSnapshot)=>{
            if(documentSnapshot.exists){
              
           setuserdata(documentSnapshot.data());
            } })
    }
    const handleUpdate= async ()=>{
      if(address==null){
        alert('address required');
      }
      else{
      await  firestore.collection("donateobject").where('location', '==', 'null').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
          var id=doc.id;
            console.log(doc.id, " => ", doc.data());
   //     }); 
     firestore.collection("donateobject").doc(id).update({
    location: location,
   detailedaddress :address
}
);
    //  await  firestore.collection("donateobject").doc().where('location', '==', 'null').get()
    //  .then((documentSnapshot)=>{
        //  if(documentSnapshot.exists){
         //    firestore.collection("donateobject").doc().update({
         //     location: location,
          //    detailaddress :address
              
          })
         
 } ) 

   
       .then(()=>{
        navigation.navigate('Food1');
       Alert.alert('submitted','request submitted');
   //navigation.navigate('login');
            })}}
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <MapView style={styles.map}  initialRegion={{
     latitude: 	32.1877,
     longitude: 74.1945,
     latitudeDelta: 1,
       longitudeDelta: 1,
      
      
    }} provider="google">
    <Marker coordinate={pin}  
    //  onDragStart={(e)=> {console.log("start", e.nativeEvent.coordinate)}}
    // onDragEnd={(e)=> {console.log("end", e.nativeEvent.coordinate);
     //getmaploc({})
     //setPin({latitude: e.nativeEvent.coordinate.latitude,
     //                          longitude: e.nativeEvent.coordinate.longitude
  //  })}}
   //  onDrag={(e)=> {console.log("start", e.nativeEvent.coordinate)}}
   pinColor="violet">
   <Callout><Text>i'm here</Text></Callout>
</Marker>
 </MapView>
  
</View>
<View style={styles.footer}>
<Text style={styles.title} >Add address</Text>
<Text style={styles.text}>current location :{text}
</Text>
  < KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <View style={styles.action}> 
<FontAwesome name="map-pin" size={20} color="#05375A"/>
  <TextInput placeholder="Enter detailed address" placeholderTextColor={'#c5c8c9'} autoCorrect={false} autoComplete="false"
  value={address}
  onChangeText={value=>setAddress(value)}
  style={styles.textInput}></TextInput>
  </View>
    <View style={{flexDirection:"row" ,paddingTop:20}}>
   <FontAwesome name="info" size={20} color="#5a565c"/>
   <Text style={{color:"#5a565c" ,paddingLeft:10}}>Make sure to enter your precise address</Text>
   </View>
  </KeyboardAvoidingView>
  <View style={styles.button}>
    <TouchableOpacity onPress={handleUpdate}>
        <View style={styles.submit}>
            <Text style={styles.textSubmit}>Submit </Text>
            <MaterialIcons
            name="navigate-next"
            color='#fff'
            size={30}
            /></View>   
    </TouchableOpacity>
    </View>
</View>
    </View>
  );
}
export default Map;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#B100FF"
  },
  header:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
footer:{
    flex:1,
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
textInput:{
  flex:1,
  paddingLeft:10,
  color:'#B100FF',
  alignItems:'flex-start'
},
action:{
  flexDirection:'row',
  marginTop:10,
  marginBottom:10,
  borderBottomWidth:1,
  borderBottomColor:"#B100FF",
  paddingBottom:5
},
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text:{
    color:"#2F3D66",
    fontSize:13,
    fontWeight:"bold",
    marginTop:5
},
button:{
        
  alignItems:"flex-end",
  borderRadius:30,
  marginTop:1
},
submit:{
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
textSubmit:{
  alignContent:"center",
  color:"white",
  fontWeight:'bold'
}
});