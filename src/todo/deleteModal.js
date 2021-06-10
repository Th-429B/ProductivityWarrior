import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

const deleteModal = ({navigation, deleteAll}) => {
    return(
        <View style={styles.inner}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Are you sure you want to delete all tasks?</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {deleteAll(); navigation()}}>
                <View style={styles.innerButton}>
                    <Text style={{color: 'red'}}>Delete All</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation()}>
                <View style={styles.innerButton}>
                    <Text>Cancel</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    titleContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    title: {
        fontSize: 15,
    }
})

export default deleteModal;
