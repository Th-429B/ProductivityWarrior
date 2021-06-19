import React, {useState} from 'react'
import {
    Keyboard,
    View,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    TouchableOpacity,
    SafeAreaView, StatusBar, Alert
} from "react-native";
import {saveModules} from "./storage";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {Picker} from '@react-native-picker/picker';

const NewMod = ({setModulesTaken, modulesTaken, navigation, moduleList, totalMC, setTotalMC, capTotal, setCapTotal}) => {

    const paddingValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0
    const [modCode, setModCode] = useState(null);
    const [grade, setGrade] = useState('A+');
    const [applySU, setApplySU] = useState(false);
    const gradeMap = {
        'A+': 5.0,
        'A': 5.0,
        'A-': 4.5,
        'B+': 4.0,
        'B': 3.5,
        'B-': 3.0,
        'C+': 2.5,
        'C': 2.0,
        'D+': 1.5,
        'D': 1.0,
        'F': 0.0,
    }

    const done = () => {
        if (!modCode) {
            Alert.alert('Module code is empty!');
        } else {
            const module = moduleList.filter((mod) => mod['moduleCode'] === modCode);
            const exist = modulesTaken.filter((mod) => mod['moduleCode'] === modCode);
            if (!module.length) {
                Alert.alert('Module not found!');
            } else if (exist.length){
                Alert.alert('Module already exist!')
            } else if (!grade) {
                Alert.alert('Please select your grade!');
            } else {
                const newMod = {
                    moduleCode: module[0]['moduleCode'],
                    title: module[0]['title'],
                    description: module[0]['description'],
                    moduleCredit: module[0]['moduleCredit'],
                    department: module[0]['department'],
                    faculty: module[0]['faculty'],
                    grade: grade,
                    SU: applySU,
                }

                const newMods = [...modulesTaken, newMod];
                setModulesTaken(newMods);
                //saveModules(newMods)

                if (!applySU && grade !== 'CS' && grade !== 'CU') {
                    const intMC = parseInt(module[0]['moduleCredit'])
                    setTotalMC(totalMC + intMC);
                    setCapTotal(capTotal + intMC * gradeMap[grade]);
                }

                setModCode(null);
                setGrade('A+');
                setApplySU(false);

                Keyboard.dismiss();
                navigation();
            }
        }
    }

    const cancel = () => {
        Keyboard.dismiss();
        navigation();
    }

    const toggleApplySU = () => {
        setApplySU(!applySU);
    }

    const showSU = () => {
        if (applySU) {
            return (
                <View style={styles.innerButton}>
                    <Text>SU Applied</Text>
                    <MaterialIcons name="check-circle" size={24} color={"#00adf5"} />
                </View>
            )
        } else {
            return (
                <View style={styles.innerButton}>
                    <Text>Apply SU</Text>
                    <MaterialIcons name="radio-button-unchecked" size={24} color={"#00adf5"} />
                </View>
            )
        }
    }

    return(
        <SafeAreaView style = {styles.safe(paddingValue)}>
            <View style={styles.inner}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => cancel()}>
                        <View style={styles.innerButton}>
                            <Ionicons name="chevron-back" size={24} color="#00adf5" />
                            <Text style={{color: "#00adf5"}}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Add Modules</Text>
                    <TouchableOpacity onPress={() => done()}>
                        <View style={styles.innerButton}>
                            <Text style={{color: "#00adf5"}}>Done</Text>
                            <Ionicons name="checkmark" size={24} color="#00adf5" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.subheading}>
                    <Text style={styles.subheadingText}>Enter Module Code</Text>
                </View>
                <TextInput value={modCode} style={styles.textInput} onChangeText={modCode => setModCode(modCode)} placeholder={"Enter module code"} />
                <View style={styles.subheading}>
                    <Text style={styles.subheadingText}>Select Grade</Text>
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
                </Picker>
                <View style={styles.subheading}>
                    <Text style={styles.subheadingText}>SU Declaration</Text>
                </View>

                <TouchableOpacity style={styles.buttonSU} onPress={() => toggleApplySU()}>
                    {showSU()}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'white',
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerButton: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInput: {
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 15,
    },
    footer: {
        paddingTop: 10,
        fontSize: 12,
    },
    subheading: {
      paddingVertical: 15,
    },
    subheadingText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonSU: {
        backgroundColor: 'white',
        marginVertical: 7,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        opacity: 1,
    },
})

export default NewMod