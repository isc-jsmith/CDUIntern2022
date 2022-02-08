import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, MaskedViewComponent} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomPicker from '../components/CustomPicker';
import DropDownMenu from '../components/DropDownMenu';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';

const RESPIRATORY_RATE_REGEX = /^[0-9]{1,2}[:.,-]?$/;
const SPO2_REGEX = /^[0-9]{2,3}[:.,-]?$/;
const OXYGEN_REGEX = /^[0-9]{1,2}[:.,-]?$/;
const HEART_RATE_REGEX = /^[0-9]{2,3}[:.,-]?$/;
const SYSTOLIC_REGEX = /^[0-9]{2,3}[:.,-]?$/;
const DIASTOLIC_REGEX = /^[0-9]{2,3}[:.,-]?$/;
const TEMPERATURE_REGEX = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
const BLOOD_GLUCOSE_REGEX = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
const PAIN_REGEX = /^[0-9]{1,2}[:.,-]?$/;
const WEIGHT_REGEX = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;



const VitalSignInput = () => {
  const {control, handleSubmit, watch} = useForm();
  const navigation = useNavigation();

  const onScanAgainPressed = () => {
    navigation.navigate('Scan');
  }; 


  // will send the data as a Json 
  // From here to the 'ObsnConfirmation' Screen using navigation + route.params (in the 'ObsnConfirmation' Screen)
  // params-route: https://reactnavigation.org/docs/params/
  const onUpdatePressed = (data) => {
		navigation.navigate('ObsnConfirmation', {
      dataKey : data
    });
    console.log(data);
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Observation Entry</Text>
        <Text>Name: Marcus AGUIRRE</Text>
        <Text>DOB: 04/07/1969 Age: 52y6mth30d</Text>
        <Text></Text>
        {/* Just harcode time here. Once connected to TrakCare, can pull this info */}
        <Text style={{alignSelf: 'flex-end'}}>...icons...</Text>
        <Text style={{alignSelf: 'flex-end'}}>Last Observation: {new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}</Text>

        <View style={{height: 430, padding:20, width: "110%"}} >
          <ScrollView persistentScrollbar={true}>
            
            {/* <DropDownMenu 
              name="Consciousnes"
              itemList={[{label:"Select", value: ""},
                        {label:"Level1" ,value: "Level1"},
                        {label:"Level2" ,value: "Level2"},
                        {label:"Level3" ,value: "Level3"}]}
            /> */}

            <CustomPicker
              name="Consciousness"
              control={control}
              itemList={[{label:"Select", value: ""},
                        {label:"Level1" ,value: "Level1"},
                        {label:"Level2" ,value: "Level2"},
                        {label:"Level3" ,value: "Level3"}]}
            />

            <CustomInput
              name="Respiratory Rate (bpm)"
              control={control}
              placeholder="... type here..."
              referenceRange={[10, 25]}
              rules={{
                pattern: {value: RESPIRATORY_RATE_REGEX, message: 'Invalid Value'},
              }}
            />

            <CustomInput
              name="Sp02 (%)"
              control={control}
              placeholder="... type here..."
              referenceRange={[95, 100]}
              rules={{
                pattern: {value: SPO2_REGEX, message: 'Invalid Value'},
              }}
            />
            <CustomInput
              name="Oxygen (lpm)"
              control={control}
              placeholder="... type here..."
              referenceRange={[4, 12]}
              rules={{
                pattern: {value: OXYGEN_REGEX, message: 'Invalid Value'},
              }}
            />

            <CustomPicker 
              name="Oxygen Device"
              control={control}
              itemList={[{label:"Select", value:""},
                        {label:"Device1", value:"Device1"},
                        {label:"Device2", value:"Device2"},
                        {label:"Device3", value:"Device3"}]}
            />

            <CustomInput
              name="Heart Rate (bpm)"
              control={control}
              placeholder="... type here..."
              referenceRange={[50, 120]}
              rules={{
                pattern: {value: HEART_RATE_REGEX, message: 'Invalid Value'},
              }}
            />
            <CustomInput
              name="Systolic BP (mmHg)"
              control={control}
              placeholder="... type here..."
              referenceRange={[100, 180]}
              rules={{
                pattern: {value: SYSTOLIC_REGEX, message: 'Invalid Value'},
              }}
            />
            <CustomInput
              name="Diastolic BP (mmHg)"
              control={control}
              placeholder="... type here..."
              referenceRange={[60, 90]}
              rules={{
                pattern: {value: DIASTOLIC_REGEX, message: 'Invalid Value'},
              }}
            />
            <CustomInput
              name="Temperature (°C)"
              control={control}
              placeholder="... type here..."
              referenceRange={[36.1, 37.1]}
              rules={{
                pattern: {value: TEMPERATURE_REGEX, message: 'Invalid Value'},
              }}
            />
            <CustomInput
              name="Blood Glucose (mmol/L)"
              control={control}
              placeholder="... type here..."
              referenceRange={[4.0, 8.0]}
              rules={{
                pattern: {value: BLOOD_GLUCOSE_REGEX, message: 'Invalid Value'},
              }}
            />
            <CustomInput
              name="Pain"
              control={control}
              placeholder="... type here..."
              rules={{
                pattern: {value: PAIN_REGEX, message: 'Invalid Value'},
              }}
            />
            <CustomInput
              name="Weight (kg)"
              control={control}
              placeholder="... type here..."
              referenceRange={[10,25]}
              rules={{
                pattern: {value: WEIGHT_REGEX, message: 'Invalid Value'},
              }}
            />
          </ScrollView>
        </View>
        
        <CustomButton
          text="Note"
          onPress={onScanAgainPressed}
          type="TERTIARY"
        />

        <CustomButton
          text="Update"
          // handleSubmit: receive FORM data
          onPress={handleSubmit(onUpdatePressed)}
        />

        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
  textRight: {
    color: 'gray',
    textAlign: 'right',
  }
});

export default VitalSignInput;