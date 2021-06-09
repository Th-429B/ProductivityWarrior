import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

const settingsModal = ({navigation}) => {
    return(
        <View style={styles.inner}>
            <TouchableOpacity style={styles.button}>
                <Text>Show Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text>Mark All as Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text>Delete All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation()}>
                <Text>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inner: {
        backgroundColor: '#f2f4f5',
        paddingBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    button: {
        backgroundColor: 'white',
        marginVertical: 7,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        opacity: 1,
    }
})

export default settingsModal;