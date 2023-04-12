import {Pressable} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

function IconButton({name,color,size,onPress,style1}){
    return(
        <Pressable  onPress={onPress} style={style1} android_ripple={{color:'black'}}>
            <Ionicons name={name} size={size} color={color}/>
        </Pressable>
    );
}

export default IconButton;