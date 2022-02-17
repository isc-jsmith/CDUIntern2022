import React, { useState, useEffect, useRef, Fragment, Component } from 'react';
import {
    View,
    TextInput,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Animated,
    PermissionsAndroid,
    default as Easing,
    ImageBackground,
    componentDidMount, Linking, Alert,
} from 'react-native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { RNCamera } from 'react-native-camera';
import { color } from 'react-native-reanimated';

const Stack = createNativeStackNavigator();
let camera;

/*
function DisplayScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen render test</Text>
        </View>
    );
}

function HomeScreen() {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={DisplayScreen}
                    options={{
                        title: 'Welcome @username',
                        headerStyle: {
                            backgroundColor: '#3B71F3',
                        },
                        headerTintColor: '#fff',
                    }}
                />
            </Stack.Navigator>
    );
}
export default HomeScreen;
*/









export default function HomeScreen() {
    const moveAnim = useRef(new Animated.Value(-2)).current;

    useEffect(() => {
        requestCameraPermission();
        startAnimation();
    }, []);

    const [scan, setScan] = useState(false);
    const [ScanResult, setScanResult] = useState([]);
    const [result, setResult] = useState([]);
    
    const navigateToVitalInput = (e) => {
        navigation.navigate('VitalSignInputScreen', { patientId: e.data.split(",")[2] });
    }

    const onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        setScan(false);
        setScanResult(false);
        setResult(['']);

        if (check === 'http') {
            Linking
            setResult('invalid code');
            setScan(false);
            setScanResult(true);
        }
        else {
            setResult(e);
            setScan(false);
            setScanResult(true);
        }
        //alert(e.data.split(",")[2])
        // navigation.reset({
        //     index: 0,
        //     routes: [
        //         {
        //             name: 'VitalSignInputScreen',
        //             params: {patientId :  e.data.split(",")[2] },
        //         },
        //     ],
        // })
        navigateToVitalInput(e);
    };

    //ask for camera permission
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Apply permission of the camera',
                    message: 'Need camera permission to access the camera',
                    buttonNeutral: 'Ask me later',
                    buttonNegative: 'Dismiss',
                    buttonPositive: 'Allow',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               // console.log('Camera permission request succeed');
            } else {
                //console.log('You dont have camera access');
            }
        } catch (err) {
           // console.warn(err);
        }
    };

    /** scanner frame animation*/
    const startAnimation = () => {
        Animated.sequence([
            Animated.timing(moveAnim, {
                toValue: 200,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            Animated.timing(moveAnim, {
                toValue: -1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
        ]).start(() => startAnimation());
    };

    /** Get the Data from scanner*/
    const navigation = useNavigation();

    const onBarCodeRead = (result) => {
        const { data } = result;
        //console.log(data);
       // alert(data);

    };


    const PatientRead = (patientID) => {
        Alert(patientID);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic c3VwZXJ1c2VyOnBhc3N3b3Jk");
        var url = "http://172.19.42.68:52773/tcfhir/trakr4/Patient/"+patientID+"?_format=json";
        fetch('http://172.19.42.68:52773/tcfhir/trakr4/Patient/RN000000020?_format=json', {
            method: 'GET',
            headers: myHeaders,
        })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //Success
                //alert(JSON.stringify(responseJson));
                console.log(responseJson);
            })
            //If response is not in json then in error
            .catch((error) => {
                //Error
               // alert(JSON.stringify(error));
                console.error(JSON.stringify(error));
            });
    }

    const pageTitle = "Home";
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    return (
        <ScrollView>
        <SafeAreaView>
            
                <SafeAreaView
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 15,
                        flex:1,
                        backgroundColor: '#678cf8',
                        marginBottom:0
                    }}>
                    <Text style={{fontSize:14, color:'#FFF'}}>
                        { pageTitle }
                    </Text>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={22} color={'#FFF'}/>
                    </TouchableOpacity>
                </SafeAreaView>
                <SafeAreaView style={{flex:1}}>
                    <RNCamera
                        ref={(ref) => {
                            camera = ref;
                        }}
                        autoFocus={RNCamera.Constants.AutoFocus.on} /*auto focusing*/
                        style={[styles.preview]}
                        captureAudio={false}
                        type={RNCamera.Constants.Type.back} /*switch front&back camera*/
                        flashMode={RNCamera.Constants.FlashMode.off} /*enable camera flash*/
                        onBarCodeRead={onSuccess}>
                        <View>
                            <Text style={styles.rectangleText}>
                                [ Scan Barcode Here ]
                            </Text>
                        </View>
                    </RNCamera>
    
            </SafeAreaView>
                <Text style={{ textAlign: 'center', color: '#000', fontWeight:'bold', marginBottom:3 }}> OR  </Text>
                <Text style={{ textAlign: 'center' }}> Enter  Information Manually</Text>  

                <TextInput
                    defaultValue={result.data}
                    autoFocus={true}
                    placeholder="Format: dd/mm/YYYY,Patient Name, Registration "
                    style={{ marginTop: 10, color: '#000', alignSelf: 'center', fontSize: 16, backgroundColor: '#FFF', textAlign:'center'  }}
                
                />

                
            {/* <CustomInput
                    autoFocus={true}
                    name="barcodeData"
                    placeholder="Format: dd/mm/YYYY,Patient Name, Registration "
                    control={control}
                    defaultValue = {result.data}
                    rules={{
                        required: 'Patient Information is Mandatory',
                        minLength: {
                            message: 'Please scan barcode before searching patient',
                        },
                    }}
            /> */}
                <SafeAreaView>
                    
                    <CustomButton
                        text={"Scan Again"}
                    />
                </SafeAreaView>
        </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        borderWidth: 1,
        borderColor: '#000',
        overflow: 'hidden',
        marginBottom:10
    },
    rectangleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rectangle: {
        
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        fontWeight:'bold'
    },
});