import React from "react";
import * as Animatable from 'react-native-animatable';
import LottieView from "lottie-react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View ,Text,Button ,Image ,StyleSheet ,TouchableOpacity,TextInput} from "react-native";
const Add=({navigation})=>{
    return(
    <View style={styles.container}>
        <View style={styles.header}>
        <View style={{width:450 ,height:450}}>
<LottieView  style={{marginTop:2}}
source={require('../assets/box.json')} autoPlay loop duration={3000}  />
        </View>
        </View>
        <Animatable.View style={styles.footer}
         animation="fadeInUpBig" duration={1500}>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=> navigation.navigate('Donate Food')}>
                <View style={styles.continue}>
                    <Text style={styles.textContinue}>Donate Food </Text>
                    <MaterialIcons
                    name="navigate-next"
                    color='#fff'
                    size={30}
                    /></View>   
            </TouchableOpacity>
            </View>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=> navigation.navigate('Donate Clothes')}>
                <View style={styles.continue}>
                    <Text style={styles.textContinue}> Donate Clothes </Text>
                    <MaterialIcons
                    name="navigate-next"
                    color='#fff'
                    size={30}
                    /></View>   
            </TouchableOpacity>
            </View>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=> navigation.navigate('Request Food')}>
                <View style={styles.continue}>
                    <Text style={styles.textContinue}> Request Food </Text>
                    <MaterialIcons
                    name="navigate-next"
                    color='#fff'
                    size={30}
                    /></View>   
            </TouchableOpacity>
            </View>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=> navigation.navigate('Request Clothes')}>
                <View style={styles.continue}>
                    <Text style={styles.textContinue}> Request Clothes </Text>
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
export default Add;
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
        alignItems:'center',
        alignContent:'center',
        backgroundColor:"#fff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:50,
        paddingHorizontal:30,
    },
    text:{
        color:"#24366F",
        fontSize:13,
        fontWeight:"bold",
        margin:5
    },
    button:{
        alignItems:"center",
        borderRadius:30,
        margin:5
    },
    continue:{
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
    textContinue:{
        alignContent:"center",
        color:"white",
        fontWeight:'bold'
    },
});
