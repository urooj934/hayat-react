import React, { useState } from "react";
import { View ,Text ,TouchableOpacity } from "react-native";
const CustomSwitch =({selectionMode,option1,option2,onSelectSwitch})=>{
    const[getSelectionMode , setSelectionMode]=useState(selectionMode);
    const updateSwitchData =(value)=>{
        setSelectionMode(value);
        onSelectSwitch(value)
    }
    return(
        <View style={{height:60,width:'100%',
        backgroundColor:"#C6C6C6",borderRadius:10,
        borderColor:"#AD40AF",
        flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity activeOpacity={1} onPress={()=>updateSwitchData(1)}
            style={{flex:1,
                backgroundColor:getSelectionMode == 1 ? '#AD40AF':'#c4c4c4',
            borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text 
                style={{color:getSelectionMode == 1 ?'white':'#AD40AF',
            fontSize:14}}>donations</Text>
            </TouchableOpacity>
             <TouchableOpacity activeOpacity={2} onPress={()=>updateSwitchData(2)}
            style={{flex:1,backgroundColor:getSelectionMode==2?'#AD40AF':'#c4c4c4',
            borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:getSelectionMode==2?'white':'#AD40AF',
            fontSize:14}}>Requests</Text></TouchableOpacity>
        </View>
    );
}
export default CustomSwitch;