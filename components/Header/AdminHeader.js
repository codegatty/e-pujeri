import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet ,Button,Text} from 'react-native';

import IconButton from '../ui/IconButon';
import { globalColors } from '../../constants/appColors';
import CustomButton from '../ui/CustomButton';
import { ShowAllEventContext } from '../../store/showAllEvent-context';
import { ShowAllNotifcationContext } from '../../store/showAllNotification-Context';


function AdminHeader({screen,size}) {

    const Navigation = useNavigation();
    const allEventCtx=useContext(ShowAllEventContext);
    const allNotificationCtx=useContext(ShowAllNotifcationContext);

    let ele='';

    function allNotificationHandler(){
        Navigation.navigate('Announcements')
        if(allNotificationCtx.shouldShow==true){
            allNotificationCtx.toShouldShow(false)
        }else if(allNotificationCtx.shouldShow==false){
            allNotificationCtx.toShouldShow(true)
        }    
    }

    function allEventsHandler(){
        Navigation.navigate('Events')
        if(allEventCtx.shouldShow==true){
            allEventCtx.shouldShow=false
        }else if(allEventCtx.shouldShow==false){
            allEventCtx.shouldShow=true
        }
    }
    function eventLabelHandler(){
        if(allEventCtx.shouldShow==true)
            return 'Few'
        else
            return 'more'
    }

    function notificationLabelHandler(){
        if(allNotificationCtx.shouldShow==true)
            return 'Few'
        else
            return 'All'
    }

    function iconButtonOnpressFunction(screen) {
        if(screen==='events'){
            Navigation.navigate('ManageEvent');
        }
        else if(screen==='announcements'){
            Navigation.navigate('ManageAnnouncement');
        }
    }

   if(screen ==='about'){
        ele=<View></View>  
    }else if(screen==='events'){
         ele=<View style={styles.container}>
        <CustomButton 
        style2={styles.label} 
        style3={styles.button} 
        style1={styles.buttonContainer}
        onPress={allEventsHandler}>{eventLabelHandler()}</CustomButton>
        <IconButton 
        name='add' 
        size={30} 
        color={globalColors.colors.primary100} 
        onPress={iconButtonOnpressFunction.bind(this,'events')} 
        style1={{marginRight:10,marginLeft:10}} />
        
    </View>;
    }
    else if(screen==='announcements'){
         ele=<View style={styles.container}>
            <CustomButton 
            style2={styles.label} 
            style3={styles.button} 
            style1={styles.buttonContainer}
            onPress={allNotificationHandler}>{notificationLabelHandler()}</CustomButton>

            <IconButton 
            name='add' 
            size={30} 
            color={globalColors.colors.primary100} 
            onPress={iconButtonOnpressFunction.bind(this,'announcements')}
            style1={{marginRight:10}}/>
            </View>;
    }  

    return (
        
        <View>
            {ele}
        </View>

    );

}

export default AdminHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection:'row'
    },
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
