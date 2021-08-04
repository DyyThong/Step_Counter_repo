import React from 'react';
import {StyleSheet,View,ScrollView,Text, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from '../components/FirebaseConfig'
const HomeStack = createStackNavigator();
function HistoryStack(){
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var time = today.toLocaleTimeString();

    today = dd + '-' + mm + '-' + yyyy;
    String(today);
    // db.collection("User").doc(user.uid).collection("Step").onSnapshot((snap) =>{
    //     const datas = [];
    //     snap.forEach( 
    //         doc =>{
    //             doc.ref.collection("Log").get().then(snapLog=>{
    //                 snapLog.forEach( aa=>{
    //                     datas.push({
    //                         message: aa.data().Message,
    //                         step: aa.data().Step,
    //                         time: aa.data().Time,
    //                     })
    //                 })
    //                 setData(datas);
    //             },
    //         error => {
    //             console.log(error)
    //         }
    //         )
    //     })
    //  })
    var [data1, setData] = React.useState([]);
    db.collection("User").doc(user.uid).collection("Step").doc("16-06-2021").collection("Log").get().then((snap) =>{
        const datas = [];
        snap.forEach((doc) =>{
            datas.push({
                message: doc.data().Message,
                step: doc.data().Step,
                time: doc.data().Time,
            })
        })
        setData(datas);
    
     })

    return(
        <View style={styles.container}>
            <ScrollView>
                {

                    data1.map((item, index) => (
                    <View key = {item.time} style = {styles.item}>
                        <View style={{ justifyContent: 'space-between',flex:1,flexDirection:'row',}}>
                            <View style={styles.top}>
                                <Text>{"Message: " + item.message}</Text>
                            </View> 

                            <View style={styles.middle}>
                                <Text>{"Time: " + item.time}</Text>
                            </View>

                            <View style={styles.bottom}>
                                <Text>{"Step: " + String(item.step)}</Text>    
                            </View>   
                        </View>

                        
                    </View>
                  ))
               }
            </ScrollView>
        </View>
    );
};

export default function HistoryScreen({navigation}) {
	return (
		<HomeStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#CDC9A5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <HomeStack.Screen name="Historysc" component={HistoryStack} options={{
            title:'History',
            headerLeft: () => (
                <Icon.Button name="history" size={25} backgroundColor="#CDC9A5" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
        </HomeStack.Navigator>
	);
}
const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 5,
        margin: 2
    },
    top: {
        flex: 1,
        backgroundColor: 'powderblue',
        borderWidth: 2,
        justifyContent: 'space-around',
        marginBottom:5,
    },
    middle: {
        flex: 1.5,
        backgroundColor: 'skyblue',
        borderWidth: 2,
        justifyContent: 'space-between',
        marginLeft: 2,
        marginBottom:5,
    },
    bottom: {
        flex: 1,
        backgroundColor: 'steelblue',
        borderWidth: 2,
        justifyContent: 'space-between',
        marginLeft: 2,
        marginBottom:5,
    },
    // imageBackground: {
	// 	flex: 1,
	// 	resizeMode: "cover",
	// 	justifyContent: "center"
	//   },
    // item: {
    // alignItems:'center',
    // backgroundColor:'white',
    // justifyContent:'space-between',
    // shadowColor: "black",
    // padding:5,
    // },
})
