import React from "react";

import { View ,SafeAreaView,StyleSheet,FlatList,Text,Animated,TouchableOpacity} from "react-native";
import *as Animatable from "react-native-animatable";
import { firestore,auth } from "../firebase/firebase";
import LottieView from "lottie-react-native";
import { useState ,useEffect } from "react";
import  FontAwesome from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableHighlight } from "react-native-gesture-handler";
const Notification =({navigation}) =>{
    const [update,setUpdate]=useState(null);
    const [loading,setLoading]=useState(true);
    const getUpdates =async()=>{
      const list =[];
      await  firestore.collection('users').doc(auth.currentUser.uid).collection('updates').orderBy('createdAt','desc').where("user","==",auth.currentUser.uid).get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach(doc=> {
                  const {message,title,createdAt}=doc.data();
                  const convert = createdAt.nanoseconds/1000000000
                  const seconds = createdAt.seconds + convert
                  const date = new Date(seconds*1000)
              list.push({
                  id:doc.id,
                  title,
                  message,
                  createdAt:date.toDateString(),
              });console.log(createdAt);
          })
                     })
                     setUpdate(list.map((listItem,index)=>({
                      key:`${index}`,
                      id:listItem.id,
                      title:listItem.title,
                      message:listItem.message,
                      time:listItem.createdAt,
                     })))
              if(loading){
                  setLoading(false);
              }
            }
    useEffect(()=>{

     getUpdates();
     navigation.addListener(`focus`,()=> setLoading(!loading));
    
    },[navigation,loading]);
    useEffect(()=>{
      getUpdates();
    },[loading]);
    const closeRow=(rowMap,rowKey)=>{
if(rowMap[rowKey]){
    rowMap[rowKey].closeRow();
}

    }
    const deleterow= (rowMap,rowKey)=>{
        closeRow(rowMap,rowKey);
        const newData=[...update];
        const prevIndex=update.findIndex(item=>item.key===rowKey);
        newData.splice(prevIndex,1);
        setUpdate(newData);
    //    await  firestore.collection('users').doc(auth.currentUser.uid).collection('updates').doc(rowKey).delete().then(()=>{
      //      console.log('deleted');
     // <FlatList data={update}
      //keyExtractor={item=>item.id}
     // renderItem={({item})=>{
       //  <View style={styles.Noticontainer}>
         //     <Text>{item.uid}</Text>
           //   <Text>{item.message}</Text>
         // </View>
      //}}></FlatList>
        //})
    }

    const HiddenItemWithActions = props => {
        const {
          onClose,
          onDelete,
        } = props;
    
    
        return (
          <View style={styles.rowBack}>
         <Animatable.Image source={require('../assets/logo.png')}
animation="bounceIn"
duration={1500}
style={{borderRadius:25 ,width:40 ,height:40}}
resizeMode='stretch'
/>
            <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}>
            <FontAwesome
              name="ban"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
           <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete} >
           <FontAwesome
              name="trash"
              size={25}
              style={styles.trash}
              color="#fff"
            />
           </TouchableOpacity>
            
          </View>
        );
      };
    const VisibleItem= props =>{
        const {data}=props;
        return(<Animated.View
        style={[styles.rowFront]}>
        <TouchableHighlight
          style={styles.rowFrontVisible}
          onPress={()=>console.log('n')}
          underlayColor={'#aaa'}>
          <View>
            <View style={{display:'flex', flexDirection:"row" }}>
            <Text style={styles.title} numberOfLines={1}>
              {data.item.title}
            </Text>
            <View style={{marginLeft:99}}>
            <Text style={styles.details} numberOfLines={1}>
              {data.item.time}
            </Text>
            </View>
            </View>
           
            <Text style={styles.details} numberOfLines={1}>
              {data.item.message}
            </Text>
          </View>
        </TouchableHighlight>
      </Animated.View>);
    }
    const renderItem=(data,rowMap)=>{
 return(<VisibleItem data={data}/>);
    }
    const renderHiddenItem=(data,rowMap)=>{
        return(
        <HiddenItemWithActions data={data}
            rowMap={rowMap}
        onClose={()=>closeRow(rowMap,data.item.key)}
        onDelete={()=>deleterow(rowMap,data.item.key)}/>);
           }
    return(
    <SafeAreaView style={styles.container}>
    <View style={styles.box}>
    <Animatable.Text animation="pulse" easing="ease-out"  iterationCount="infinite"
     style={{fontSize:20,
     color:'#B100FF',fontWeight:'bold'}}>HAYAT</Animatable.Text>
    <Animatable.Image source={require('../assets/logo.png')}
animation="bounceIn"
duration={1500}
style={{borderRadius:25 ,width:40 ,height:40}}
resizeMode='stretch'
/>
    </View>
    {loading?(<LottieView style={{height:100 ,width:100,alignSelf:'center'}}
source={require('../assets/loader.json')} autoPlay loop duration={3000}  />):(<View>
    <SwipeListView
    data={update}
    //keyExtractor={item=>item.id}
    renderItem={renderItem}
    renderHiddenItem={renderHiddenItem}
    leftOpenValue={75}
    rightOpenValue={-150}
    />
</View>)}
    </SafeAreaView>);
}
export default Notification;
const styles=StyleSheet.create({
    container:{
        flex :1  ,
        padding:20,
        margin:5,
        borderBottomWidth:2,
        borderBottomColor:'#dddddd'
    },
    box:{
        flexDirection:'row' ,
        padding:20,
        margin:5,
        justifyContent:'space-between',
        marginBottom:5
    },
    Noticontainer:{
        flex :1  ,
        width:'100%',
        height:'100%',
       padding:15,
       backgroundColor:'white',
      
       borderRadius:20,
       marginBottom:3,
       borderColor: "#000",
       shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    },
    backTextWhite: {
        color: '#FFF',
      },
      rowFront: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        margin: 5,
        marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      },
      rowFrontVisible: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        padding: 10,
        marginBottom: 15,
      },
      rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
      },
      backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
      },
      backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 75,
      },
      backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      },
      trash: {
        height: 25,
        width: 25,
        marginRight: 7,
      },
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
      },
      details: {
        fontSize: 12,
        color: '#999',
        justifyContent:'flex-end'
      },
})