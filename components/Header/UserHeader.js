import { useContext } from 'react';
import {View,StyleSheet} from 'react-native';
import CustomButton from '../ui/CustomButton';
import { globalColors } from '../../constants/appColors';
import { NotificationViewContext } from '../../store/notificationView-context';

function UserHeader({screen}){
    const notificationViewCtx=useContext(NotificationViewContext)

    let ele=''
    
    function onPressHandler(){
        if(notificationViewCtx.mode==='all'){
            notificationViewCtx.selectMode('events')
        }else if(notificationViewCtx.mode=='events'){
            notificationViewCtx.selectMode('announcements')
        }else if(notificationViewCtx.mode=='announcements'){
            notificationViewCtx.selectMode('all')
        }
    }


    if(screen==='about'){
        ele=<View></View>;
    }else if(screen==='notifications'){
        ele=<View>
        <CustomButton 
        style2={styles.label} 
        style3={styles.button} 
        style1={styles.buttonContainer}
        onPress={onPressHandler}
        >all</CustomButton>
        </View>;
    }
    return(
        <View>
            {ele}
        </View>
        
    );

}

const styles=StyleSheet.create({
    label:{
        fontSize:13,
        fontWeight:'bold',
        letterSpacing:2,
        color:globalColors.colors.primary100,
        position:'absolute',
        textAlign:'center'
    },
    button:{
        backgroundColor:globalColors.colors.primaryBackground,
        paddingHorizontal:14,

    },
    buttonContainer:{
        alignContent:'center',
        justifyContent:'center',
    }

})


export default UserHeader;