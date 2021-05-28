import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

const Tasks = (props) => {

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.button}></TouchableOpacity>
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>{props.text}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        marginVertical: 7,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        width: 25,
        height: 25,
        borderRadius: 50,
        backgroundColor: '#97d1fc',
    },
    textWrapper: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 15,
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
    }
})

export default Tasks;