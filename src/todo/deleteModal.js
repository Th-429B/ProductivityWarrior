import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

// Delete confirmation modal
const deleteModal = ({navigation, deleteFunction, deleteAll}) => {
    return(
        <View style={styles.inner}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{deleteAll ? 'Are you sure you want to delete all tasks?' : 'Are you sure you want to delete this task?'}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {deleteFunction(); navigation()}}>
                <View style={styles.innerButton}>
                    <Text style={{color: 'red'}}>{deleteAll ? 'Delete All' : 'Delete'}</Text>
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
