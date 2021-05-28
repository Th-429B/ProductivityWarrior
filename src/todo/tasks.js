import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

const Tasks = (props) => {

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.button}></TouchableOpacity>
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>{props.text}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <TouchableOpacity>
                    <MaterialIcons name="info-outline" size={24} color={"#00adf5"}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        marginVertical: 7,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {
        width: 21,
        height: 21,
        borderRadius: 50,
        backgroundColor: 'white',
        borderColor: '#00adf5',
        borderWidth: 2,
    },
    textWrapper: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 15,
        alignItems: 'center',
        maxWidth: '80%',
    },
    text: {
        fontSize: 14,
    },
})

export default Tasks;