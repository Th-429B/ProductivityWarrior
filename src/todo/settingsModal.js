import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const settingsModal = ({navigation, toggleCompleted, completedVisibility, deleteAll}) => {

    const showCompleted = () => {
        if (completedVisibility) {
            return (
                <View style={styles.innerButton}>
                    <Text>Hide Completed</Text>
                    <Ionicons name="eye-off-outline" size={24} color="black" />
                </View>
            )
        } else {
            return (
                <View style={styles.innerButton}>
                    <Text>Show Completed</Text>
                    <Ionicons name="eye-outline" size={24} color="black" />
                </View>
            )
        }
    }

    return(
        <View style={styles.inner}>
            <TouchableOpacity style={styles.button} onPress={() => {toggleCompleted(); navigation()}}>
                {showCompleted()}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <View style={styles.innerButton}>
                    <Text>Mark All as Completed</Text>
                    <Ionicons name="checkmark-circle-outline" size={24} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {deleteAll(); navigation()}}>
                <View style={styles.innerButton}>
                    <Text style={{color: 'red'}}>Delete All</Text>
                    <Ionicons name="trash-bin-outline" size={24} color="red" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation()}>
                <View style={styles.innerButton}>
                    <Text>Cancel</Text>
                    <Ionicons name="close-circle-outline" size={24} color="black" />
                </View>
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 1,
    },
    innerButton: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    }
})

export default settingsModal;