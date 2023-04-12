import {View,StyleSheet,Text} from 'react-native';
import PickerModal from 'react-native-picker-modal-view';

function EventType({label,onChangeType,defaultType}){
    let selectedIndex;
    const typeOfEvents=[
        {Name:'Meeting', Value:'meeting'},
        {Name:'Pooja', Value:'pooja'},
        {Name:'Ame', Value:'ame'},
        {Name:'Soothaka', Value:'soothaka'},
        {Name:'Varshika',Value:'varshika'}
    ];
    if(defaultType){
    selectedIndex=typeOfEvents.findIndex((type)=>type.Value===defaultType);
    }
    function SelectedEventHandler(selectedType){
        onChangeType(selectedType);
    }

    function closeHandler(){
        onChangeType(typeOfEvents[selectedIndex])
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.picker}>
            <PickerModal 
                selected={typeOfEvents[selectedIndex]}            
            items={typeOfEvents} 
            onSelected={SelectedEventHandler}
            onClosed={closeHandler}/>
            </View>
        </View>
    )
}

export default EventType;

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:10,
        marginVertical:15
        
    },
    label:{
        flex:1,
        fontSize:18,
        textAlign:'center',
        fontWeight:'300'
    },
    picker:{
        flex:2,
    }
});