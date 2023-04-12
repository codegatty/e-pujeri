import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { EventContext } from '../../store/events-context';
import CustomButton from '../ui/CustomButton';
import EventDetails from './EventDetails';
import {deleteEvent} from '../../util/http/eventHttp'
import ErrorOverlay from '../ui/ErrorOverlay';
import LoadingOverlay from '../ui/LoadingOverlay'

function EvenSummery({ route }) {
    const Navigation=useNavigation();

    const[error,setError]=useState(false);
    const [loading,setLoading]=useState(false);
    const eventCtx = useContext(EventContext);
    const selectedEventId = route.params?.id;
    const selectedEvent=route.params.id && eventCtx.events.find((ele)=>ele.id===selectedEventId);
    async function deleteHandler(){
        setLoading(true);
        try{
            await deleteEvent(selectedEventId);
        }catch(e){
            setLoading(false);
            setError(true);
        }
        setLoading(false);
        eventCtx.deleteEvent(selectedEventId);
        Navigation.navigate('Events');
    }

    function updateHandler(){
        Navigation.navigate('Event',{id:selectedEventId});
    }

    if(error){
        return <ErrorOverlay message="Could not Delete the event" onPress={()=>Navigation.goBack()}/>
    }
    if(loading){
        return <LoadingOverlay/>
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.detailContainer}>
                <EventDetails event={selectedEvent}/>
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