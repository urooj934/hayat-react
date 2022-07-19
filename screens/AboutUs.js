import React from "react";
import * as Animatable from 'react-native-animatable';
import LottieView from "lottie-react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View ,Text ,StyleSheet ,TouchableOpacity} from "react-native";
const AboutUs=({navigation})=>{
    return(
    <View style={styles.container}>
        <View style={styles.header}>
        <View style={{width:250 ,height:250}}>
<LottieView  style={{marginTop:2}}
source={require('../assets/AboutUs.json')} autoPlay loop duration={2500}/>
        </View>
        </View>
        <Animatable.View style={styles.footer}
         animation="fadeInUpBig" duration={1500}>
            <Text style={styles.title} >About Us</Text>
            <View style={styles.about}>
                <View style={{backgroundColor:'white' , height:180,alignItems:'center'}}>
        <Text style={styles.text}>we are committed to provide you with the best possible 
        service for donating ang collecting items and food.
        This is our top priority!
        Join us if you want to be part of donating revolution </Text>
        </View>
        </View>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=> navigation.navigate('Food1')}>
                <View style={styles.continue}>
                    <Text style={styles.textContinue}>Continue </Text>
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
export default AboutUs;
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
        marginTop:30,
        color:'#B100FF',
        fontSize:30,
        fontWeight:"bold"
    },
about:{
    height:200,
    alignItems:'center',
    paddingLeft:5,
    flexDirection:'row',
    marginTop:25,
    borderWidth:5,
    paddingHorizontal:4,
    borderRadius:3,
    borderColor:'#B100FF',
    shadowRadius:5,
    shadowColor:"#2b1d2e",
    paddingBottom:5,
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
},
    text:{
        color:"#24366F",
        fontSize:13,
        fontWeight:"bold",
        marginTop:5,
        paddingHorizontal:5,
        alignItems:'center'
    },
    button:{
        
        alignItems:"flex-end",
        borderRadius:30,
        marginTop:30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
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
