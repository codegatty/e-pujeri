import {Text,View,StyleSheet} from 'react-native';


function Title({children,style1}){
return (
    <View >
        <Text style={[styles.title,style1]}>{children}</Text>
    </View>
)
}

export default Title;

const styles=StyleSheet.create({

    title:{
        fontSize:22,
        fontWeight:'800',
        textAlign:'center'
    }
})