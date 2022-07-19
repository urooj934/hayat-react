import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View ,Text,StyleSheet ,TouchableOpacity,Dimensions} from "react-native";
const SplashScreen=({navigation})=>{
return(
<View style={styles.container}>
<View style={styles.header}>
    <Animatable.Image source={require('../assets/logo.png')}
    animation="bounceIn"
    duration={1500}
    style={styles.logo}
    resizeMode='stretch'
    />
</View>
<Animatable.View style={styles.footer}
 animation="fadeInUpBig" duration={1500}>
    <Text style={styles.title} >Get Started</Text>
    <Text style={styles.text}>Together we can fight the hunger, providing you an easy way to give and track your donations instantly!
</Text>
<Text style={styles.text2}>Donate now ..</Text>
    <View style={styles.button}>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <View style={styles.signin}>
            <Text style={styles.textSign}>Login </Text>
            <MaterialIcons
            name="navigate-next"
            color='#fff'
            size={30}
            /></View>   
    </TouchableOpacity>
    </View>
    </Animatable.View>
</View>
);
};
export default SplashScreen;
const {height} =Dimensions.get("screen");
const height_logo =height*0.28;   //28% of device height
const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#B100FF"
    },
    header:{
        flex:2,
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
    logo:{
        width:height_logo,
        height:height_logo
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
    }
});
