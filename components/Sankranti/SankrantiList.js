import { FlatList,Text,View,StyleSheet } from "react-native";
import { globalColors } from "../../constants/appColors";
import { dateToString } from "../../util/others/dateToString";
import { findDiffBetweenDates } from "../../util/others/findDiffBetweenDates";
import Tag from "../ui/Tag";

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
        const sDate=new Date(dataItem.item.date)
        const currentDate=new Date;
        let ele=''
        const diff=findDiffBetweenDates(sDate,currentDate)
        
        if(sDate.getMonth()===currentDate.getMonth() && diff<32 && diff>0){
            ele=<Text style={styles.info1}>Next Sankranti</Text>
        }else {
            ele='';
        }
        return <View style={styles.container}>
            <Text style={styles.title}>{month[sDate.getMonth()]}</Text>
            {ele}
            <View style={styles.detailContainer}>
            <Text style={styles.detail}><Text style={styles.value}>{dataItem.item.name}</Text></Text>
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
    },
    info1:{
            textAlign:'center',
            fontSize:18,
            borderWidth:1,
            borderColor:globalColors.colors.primary300,
            borderRadius:4,
            color:'white',
            marginHorizontal:60,
            backgroundColor:globalColors.colors.primary300,
            letterSpacing:1
        }
})