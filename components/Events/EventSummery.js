import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { EventContext } from '../../store/events-context';
import CustomButton from '../ui/CustomButton';
import EventDetails from './EventDetails';
import {deleteEvent} from '../../util/http/eventHttp'
import ErrorOverlay from '../ui/ErrorOverlay';
import LoadingOverlay from '../ui/LoadingOverlay'

function EvenSummery({route,navigation}) {

    const [isLoading,setLoading]=useState(false);
    const [isError,setErorr]=useState(false);

    const eventData=route.params.eventData;
    const eventCtx=useContext(EventContext);
    
    function updateHandler(){
        navigation.navigate('ManageEvent',{eventId:eventData.id});
    }

    async function deleteHandler(){
        const selectedEventId=eventData.id;
        setLoading(true);
        try{
            await deleteEvent(selectedEventId);
            eventCtx.deleteEvent(selectedEventId);
            navigation.navigate('Events'); 
        }catch(e){
            setLoading(false);
            setErorr(True);
        }
        setLoading(false);
    }

    if(isLoading){
        return <LoadingOverlay/>
    }
    if(isError){
        return <ErrorOverlay/>
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.detailContainer}>
                <EventDetails event={eventData}/>
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

export default EvenSummery;

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