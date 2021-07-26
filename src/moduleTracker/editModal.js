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
import {Picker} from "@react-native-picker/picker";


const editModal = ({navigation, modulesTaken, moduleStateStorageHelper, mod, refreshCAP,}) => {

    const [grade, setGrade] = useState('A+');

    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0

    // Updates grade of the selected module to the new grade
    const done = () => {
        const temp = modulesTaken;

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].moduleCode === mod['moduleCode']) {
                const mod = temp[i];
                const oldGrade = mod.grade
                mod.grade = grade;
                refreshCAP(parseInt(mod.moduleCredit), oldGrade, grade)
                break;
            }
        }
        // console.log(temp)
        moduleStateStorageHelper(temp)
        navigation();

    }

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
                    <Text style={styles.headerText}>Edit Grade</Text>
                    <TouchableOpacity onPress={() => done()}>
                        <View style={styles.innerButton}>
                            <Text style={{color: "#00adf5"}}>Done</Text>
                            <Ionicons name="checkmark" size={24} color="#00adf5" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.subheading}>
                    <Text style={styles.subheadingText}>Change Grade For {mod.moduleCode}</Text>
                </View>
                <Picker
                    selectedValue={grade}
                    onValueChange={(itemValue) =>
                        setGrade(itemValue)
                    }>
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="A" value="A" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="B" value="B" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="C+" value="C+" />
                    <Picker.Item label="C" value="C" />
                    <Picker.Item label="D+" value="D+" />
                    <Picker.Item label="D" value="D" />
                    <Picker.Item label="F" value="F" />
                    <Picker.Item label="CS" value="CS" />
                    <Picker.Item label="CU" value="CU" />
                    <Picker.Item label="NA" value="NA" />
                </Picker>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'relative',
        left: 0,
    },
    innerButton: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    subheading: {
        paddingVertical: 15,
    },
    subheadingText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

})

export default editModal;