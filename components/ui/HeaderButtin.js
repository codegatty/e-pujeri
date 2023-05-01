import { Pressable,View,Text,StyleSheet } from "react-native";
import { globalColors } from "../../constants/appColors";
import {Ionicons} from '@expo/vector-icons';

function HeaderButton({children,onpress,name,isList}){
    return(
        <Pressable onPress={onpress} style={[styles.root,isList&&styles.list]} android_ripple={{color:'#D3D3D3'}}>
            <View style={styles.content}>
                <Text style={[styles.title,isList?{color:'white'}:{color:globalColors.colors.primary100}]}>{children}</Text>
                {name &&
                <Ionicons name={name} size={18} color="white"/>
                }
            </View>
        </Pressable>
    )

}

export default HeaderButton;

const styles=StyleSheet.create({
    root:{
        maxWidth:200,
        paddingHorizontal:5,
        paddingVertical:2,
        borderRadius:5,
    },
    container:{

    },
    title:{
        color:'white',
        fontWeight:'600',
        marginRight:2,
    },
    content:{
        flexDirection:'row'
    },
    list:{
        backgroundColor:globalColors.colors.primary100,
        
        borderRadius:20,
        paddingHorizontal:20,
        marginLeft:10
    }
})