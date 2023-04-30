import {View,Text,StyleSheet} from 'react-native';
import { color } from 'react-native-reanimated';

function Tag({children,style1,style2}){
    return(
        <View style={[styles.main,style1]}>
            <Text style={[styles.text,style2]}>
                {children}
            </Text>
        </View>
    )

}

export default Tag;

const styles=StyleSheet.create({
main:{
    backgroundColor:'red',
    borderRadius:6,
    borderWidth:1,
    height:20,
    maxHeight:20,
},
text:{
    paddingHorizontal:5,
    paddingVertical:2,
    fontSize:10,
    color:'white'
}

})