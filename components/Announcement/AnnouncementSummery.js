import { useContext } from 'react';
import {View,StyleSheet} from 'react-native';

import AnnouncementDetails from './AnnouncementDetails';
import CustomButton from '../ui/CustomButton';
import {deleteAnnouncement,updateAnnouncement} from '../../util/http/announcementHttp';
import { AnnouncementContext } from '../../store/announcements-context';

function AnnouncementSummery({route,navigation}){

    const annCtx=useContext(AnnouncementContext);

    const annData=route.params.annData;
    async function deleteHandler(){
        await deleteAnnouncement(annData.id);
        annCtx.deleteAnnouncement(annData.id);
        navigation.navigate("Announcements");
    }

    function updateHandler(){
        navigation.navigate("ManageAnnouncement",{annId:annData.id})
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.detailContainer}>
                <AnnouncementDetails annData={route.params.annData}/>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    style3={styles.buttonStyle1}
                    style1={styles.buttonStyle2}
                    style2={styles.buttonStyle3}
                    onPress={updateHandler}>
                    Update
                </CustomButton>
                <CustomButton
                    style3={[styles.buttonStyle1,{backgroundColor:'red'}]}
                    style1={styles.buttonStyle2}
                    style2={styles.buttonStyle3}
                    onPress={deleteHandler}>
                    Delete
                </CustomButton>
            </View>

        </View>
    );
}

export default AnnouncementSummery;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    detailContainer: {
        flex: 2,
    },
    buttonContainer: {
        backgroundColor:'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonStyle1: {
        borderRadius:0,
        paddingHorizontal:30  
    },
    buttonStyle2: {
        flex: 1,
        borderRightWidth:1,
        borderColor:'grey'
    },
    buttonStyle3: {
        textAlign: 'center'
    }
})