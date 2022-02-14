'use strict';

import React, {useState, Fragment } from 'react';
import {
  Text,
  TouchableOpacity,
  Linking,
  View,
  StatusBar 
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanScreenStyle'
import {useNavigation} from '@react-navigation/core';
import CustomButton from '../components/CustomButton';


function ScanScreen () {
    const [scan, setScan] = useState(false);
    const [ScanResult, setScanResult] = useState(false);
    const [result, setResult] = useState('');
  
  
    const onSuccess = (e) => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
        const check = e.data.substring(0, 4);
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
        navigation.navigate('VitalSign');
    }

    // const onVitalSignPressed = () => {
    //     navigation.navigate('ObservationEntry');
    // }


    const desccription = 'QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed in 1994 for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached.'
    // // extra line to use ref in functional component
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
                        <Text numberOfLines={8} style={styles.descText}>{desccription}</Text>

                        {/* <TouchableOpacity onPress={activeQR} style={styles.buttonTouchable}>
                            <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
                        </TouchableOpacity> */}
                        <CustomButton
                            text="Click to Scan"
                            onPress={activeQR}
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
                            <Text>Age: 52y 6mth 30d</Text>
                            <Text>MRN : {result.data.split(",")[2]}</Text>
                            <Text> ...ICON...</Text>
                            
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

