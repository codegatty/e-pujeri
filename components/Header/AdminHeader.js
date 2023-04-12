import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';

import IconButton from '../ui/IconButon';
import { globalColors } from '../../constants/appColors';


function AdminHeader({screen,size}) {

    const Navigation = useNavigation();
    let ele='';

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
        <IconButton 
        name='add' 
        size={30} 
        color={globalColors.colors.primary100} 
        onPress={iconButtonOnpressFunction.bind(this,'events')} 
        style1={{marginRight:10}} />
    </View>;
    }
    else if(screen==='announcements'){
         ele=<View style={styles.container}>
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
        
    }
})
