import { FlatList,Text,View,StyleSheet } from "react-native";
import { globalColors } from "../../constants/appColors";
import { dateToString } from "../../util/others/dateToString";

function SankrantiList({dataSet}){
    let dataSetInArray=[]
    for (let key in dataSet){
        const obj={
            name:dataSet[key][1],
            date:dataSet[key][0]
        }
        dataSetInArray.push(obj)
    }
    const month=["January","February","March","April","May","June","July","August","September","October","November","December"];
    function renderHandler(dataItem){
        let sDate=new Date(dataItem.item.date)
        return <View style={styles.container}>
            <Text style={styles.title}>{month[sDate.getMonth()]}</Text>
            <View style={styles.detailContainer}>
            <Text style={styles.detail}>Name: <Text style={styles.value}>{dataItem.item.name}</Text></Text>
            <Text style={styles.detail}>Date:<Text style={styles.value}>{dateToString(dataItem.item.date)}</Text></Text>
            </View>
        </View>
    }
return(
    <View>
    <FlatList data={dataSetInArray} renderItem={renderHandler} />
    </View>
)
}

export default SankrantiList;

const styles=StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: globalColors.colors.primary100,
        flexDirection: 'column',
        padding:5,
        marginHorizontal:10
    },
    detailContainer: {
        flexDirection:"row"
    },
    detail: {
        flex: 1,
        fontSize:16,
        
    },
    title:{
        textAlign:'center',
        fontSize:18,
        fontWeight:'800',
        letterSpacing:2,
        marginBottom:5,
        borderBottomWidth:1,
        marginHorizontal:125,
        borderStyle:'dotted',
        
    },
    value:{
        fontWeight:'600',
        letterSpacing:1,
        textAlign:"center"
    }
})