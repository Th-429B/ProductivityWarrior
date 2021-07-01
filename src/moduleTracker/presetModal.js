import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    StatusBar,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";

// this list is not complete
const cs = ["cs1101s", "cs1231s", "cs2030s", "cs2040s", "cs2100",
"cs2103t", "cs2106", "cs3230"]


const presetModal = ({navigation, modulesTaken, setModulesTaken, moduleList,}) => {

    const loadMods = () => {
        for (let i = 0; i < cs.length; i++) {
            const code = cs[i].toUpperCase()
            const exist = modulesTaken.filter((mod) => mod['moduleCode'] === code);

            if (exist.length === 0) {
                const module = moduleList.filter((mod) => mod['moduleCode'] === code);
                const moduleData = module[0];
                const newMod = {
                    moduleCode: moduleData['moduleCode'],
                    title: moduleData['title'],
                    description: moduleData['description'],
                    moduleCredit: moduleData['moduleCredit'],
                    department: moduleData['department'],
                    faculty: moduleData['faculty'],
                    grade: "NA",
                    SU: false,
                }
                const newMods = [...modulesTaken, newMod];
                // somehow setModulesTaken does not work, it only works for the last iteration of the loop
                setModulesTaken(newMods);

            }
            console.log(modulesTaken)
        }
        navigation()
    }

    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

    return(
        <SafeAreaView style = {styles.safe(paddingValue)}>
            <View style={styles.inner}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation()}>
                        <View style={styles.innerButton}>
                            <Ionicons name="chevron-back" size={24} color="#00adf5" />
                            <Text style={{color: "#00adf5"}}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Load Preset Modules</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => {loadMods()}}>
                    <View style={styles.innerButton}>
                        <Text >Computer Science</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: (paddingValue) => ({
        paddingTop: paddingValue,
        flex: 1,
        backgroundColor: '#f2f4f5',
    }),
    inner: {
        backgroundColor: '#f2f4f5',
        paddingBottom: 20,
        paddingTop: 20,
        paddingHorizontal: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 1,
    },
    button: {
        backgroundColor: 'white',
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'relative',
        left: 30,
    },
    innerButton: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

})

export default presetModal;