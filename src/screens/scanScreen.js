'use strict';

import React, {useState, Fragment, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  Linking,
  View,
  StatusBar,
  LogBox,  
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanScreenStyle'
import {useNavigation} from '@react-navigation/core';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';


function ScanScreen () {
    const [scan, setScan] = useState(false);
    const [ScanResult, setScanResult] = useState(false);
    const [result, setResult] = useState('');
    const [lastObsTime, setLastObsTime] = useState('');
    const [age, setAge] = useState('');
    
    const onSuccess = (e) => {
        const check = e.data.substring(0, 10);
        console.log('scanned data: ' + check);
        setScan(false);
        setScanResult(false);
        setResult(null);

        if (check === 'http') {
            Linking
                .openURL(e.data)
                .catch(err => console.error('An error occured', err));
        } 
        else {
            setResult(e);
            setScan(false);
            setScanResult(true);
            getLastObs();
            //getAge();
        }      
    };

    const activeQR = () => {
        setScan(true);
    };

    const scanAgain = () => {
        setScan(true);
        setScanResult(false);
    };

    const navigation = useNavigation();
    // *** Test another Screen 10Feb22 ***///
    const onVitalSignPressed = () => {
        navigation.navigate('VitalSign', {
            patientInfo: result.data,
            lastObsTime: lastObsTime.split("+")[0],
        });
    }

    // *** to skip Require cycle warning ***//
    LogBox.ignoreLogs([
        'Require cycle: node_modules'
    ])


    // *** Calculate Age ***///
    const getAge = () => {
        var oldAgeFormat =  result.data.split(",")[0]
        var oldItems = oldAgeFormat.split("/");
        var dateString = oldItems[2]+'-'+oldItems[1]+'-'+oldItems[0];
        console.log(dateString);
        //var dateString = '1994-06-14';
        var ageInMilliseconds = new Date() - new Date(dateString);
        var age = Math.floor(ageInMilliseconds/1000/60/60/24/365 ); // convert to years 
        setAge(age);
        console.log('Age: ' + age);
    }

    // *** Fetch Last Observation Data *** //
    const getLastObs = () => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/fhir+json; charset=UTF-8");
        myHeaders.append("Authorization", "Basic c3VwZXJ1c2VyOnBhc3N3b3Jk");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        // *** Need to input the current local IP address ***//
        // *** Currently hard code 1 Patient MRN ***/
        fetch("http://172.19.42.127:52773/tcfhir/trakr4/Observation/$lastn?max=1&patient=Patient/RN000000020&category=vital-signs", requestOptions)
        .then(response => response.text())
        .then(string => JSON.parse(string))
        .then(obj => {
            var lastObsTime = (((obj["entry"])[0])["resource"])["effectiveDateTime"]
            console.log("last Obs Time: " + lastObsTime)
            setLastObsTime(lastObsTime)
        })
        .catch(error => console.log('error', error));
    }



    // const desccription = 'QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed in 1994 for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached.'
    // *** extra line to use ref in functional component ***
    let scanner = null;


    return (
        <View style={styles.scrollViewStyle}>
            <Fragment>
                <StatusBar barStyle="dark-content"/>
                <Text style={styles.textTitle}>Mobile TrakCare</Text>
                <Text style={styles.textTitle2}>Account Name: <Text style={styles.textBold}> Nurse </Text></Text>
                
                {/* ### Start Scanning first time ### */}
                {!scan && !ScanResult &&
                    <View style={styles.cardView} >
                        {/* <Text numberOfLines={8} style={styles.descText}>{desccription}</Text> */}
                        <CustomButton
                            text="Click to Scan"
                            onPress={() => {
                                activeQR();
                                // onLastObsPressed();
                            }}
                        />
                    </View>
                }

                {/* ### Result Screen ### */}
                {ScanResult &&
                    <Fragment>
                        <Text style={styles.textTitle1}>Result !</Text>
                        <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                            <Text>Name : {result.data.split(",")[1]}</Text>
                            <Text>DOB : {result.data.split(",")[0]} </Text> 
                            <Text>Age: 21</Text>
                            <Text>MRN : {result.data.split(",")[2]}</Text>
                            <Text>Last Observation: {lastObsTime.split("+")[0]}</Text>
                            <Text style={{alignSelf: 'flex-end'}}><Icon name="man-outline" size={23} color="#13a5a3"/></Text>
                            
                            <View style={{width:"90%", padding:20}}>
                                <CustomButton
                                        text="Observation Entry"
                                        onPress={onVitalSignPressed}
                                />
                                <CustomButton
                                        text="Scan Again"
                                        onPress={scanAgain}
                                />
                            </View>
                        </View>
                    </Fragment>
                }
                
                {/* ### Scanning Screen ### */}
                {scan &&
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        ref={(node) => { scanner = node }}
                        onRead={onSuccess}
                        topContent={
                        <View>
                        </View>
                        }
                        bottomContent={
                            <View>
                                {/* <TouchableOpacity style={styles.buttonTouchable} onPress={() => scanner.reactivate()}>
                                    <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                                </TouchableOpacity> */}

                                {/* <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScan(false)}>
                                    <Text style={styles.buttonTextStyle}>Stop Scanning</Text>
                                </TouchableOpacity> */}

                                <CustomButton
                                    text="Stop Scanning"
                                    onPress={() => setScan(false)}
                                />
                            </View>

                        }
                    />
                }

            </Fragment>

        </View>

    );
};

export default ScanScreen;

