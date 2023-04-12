import {TextInput,View,Text,StyleSheet} from 'react-native';

import { globalColors } from '../../constants/appColors';

function InputBox({label,textConfig}){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.textInput} {...textConfig} />
        </View>
    );
}

export default InputBox;

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:10,
        marginVertical:15
        
    },
    label:{
        flex:1,
        fontSize:18,
        textAlign:'center',
        fontWeight:'300'
    },
    textInput:{
        flex:2,
        backgroundColor:globalColors.colors.primary100,
        fontSize:18,
        padding:5,
        borderRadius:7,
        elevation:5,
        color:'white'
    }
})