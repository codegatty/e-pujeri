import { useContext, useState } from 'react';
import {View,StyleSheet} from 'react-native';
import CustomButton from '../ui/CustomButton';
import { globalColors } from '../../constants/appColors';
import { NotificationViewContext } from '../../store/notificationView-context';
import HeaderButton from '../ui/HeaderButtin';
import FilterModel from '../ui/FilterModel';

function UserHeader({screen}){
    const notificationViewCtx=useContext(NotificationViewContext)
    const[isModel,setModel]=useState(false)
    const isshow=isModel

    function modelVisibility(){
        setModel(true)
    }
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
        /*ele=<View>
        <CustomButton 
        style2={styles.label} 
        style3={styles.button} 
        style1={styles.buttonContainer}
        onPress={onPressHandler}
        >{notificationViewCtx.mode}</CustomButton>
        </View>;*/
        ele=<View style={styles.buttonContainer}><HeaderButton onpress={onPressHandler}>
            {notificationViewCtx.mode}
        </HeaderButton><HeaderButton onpress={modelVisibility}>Filter</HeaderButton>
        {isModel&&<FilterModel/>}
        
        </View>
    }
    return(
        <View style={styles.container}>
            {ele}
            
        </View>
        
    );

}

const styles=StyleSheet.create({
    container:{
        marginRight:40
    },
    buttonContainer:{
        flexDirection:'row'
    }
})


export default UserHeader;