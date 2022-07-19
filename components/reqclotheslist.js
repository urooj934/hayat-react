import React,{useEffect,useState,} from 'react'
import {View ,Text ,StyleSheet,Image,FlatList,} from'react-native' 
import { firestore } from '../firebase/firebase'
import PostCard from './PostCard'
import LottieView from "lottie-react-native";
const Reqclotheslist =({navigation})=>{
    const [Post,setPost]=useState(null);
    const [loading,setLoading]=useState(true);
useEffect(()=>{
    const getPosts =async()=>{
        const list =[];
        await  firestore.collection('Reqobjects').orderBy('createdAt','desc').get()
                  .then((querySnapshot)=>{
                      querySnapshot.forEach(doc=> {
                    const {uid,category,address,title,desc}=doc.data();
                list.push({
                    id:doc.id,
                    uid,
                    userName:'test',
                    userImg:'',
                    category,
                    address:address,
                    title:title,
                    desc:desc
                });
            })
                       })
                       setPost(list);
                if(loading){
                    setLoading(false);
                }
              }
 getPosts();

},[]);
 return(
     <View style={styles.container}>
        {loading?(<LottieView style={{height:100 ,width:100,alignSelf:'center'}}
source={require('../assets/loader.json')} autoPlay loop duration={3000}  />):(
  <FlatList scrollEnabled={false}
   data={Post}
   renderItem={({item})=><PostCard item={item}/> }
  keyExtractor={item=>item.id}/>)}
     </View>
 )  ;
}
export default Reqclotheslist;
const styles =StyleSheet.create({
    container:{
      flex:1,
    //  alignItems:'center',
      justifyContent:'center',
      padding:20,
      backgroundColor:'#fff'
    },
})
