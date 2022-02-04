import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, MaskedViewComponent} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import DropDownMenu from '../components/DropDownMenu';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
// import ScanScreen from './scanScreen';


const VitalSignInput = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();


  const onSkipVitalSignPress = () => {
    alert("Skip Vital Sign Update");
  };

  const onScanAgainPressed = () => {
    navigation.navigate('Scan');
  }; 

	const onUpdatePressed = () => {
		navigation.navigate('ObsnConfirmation');
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
            <CustomInput
              name="Consciousness"
              control={control}
              placeholder="... need dropdown list..."
              rules={{
                //required: 'MAP is required',
              }}
            />

            <DropDownMenu name="Consciousness"/>

            <CustomInput
              name="Respiratory Rate (bpm)"
              control={control}
              placeholder="... type here..."
              rules={{
                // required: 'Systolic is required',
                // pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
                // minLength: {
                //     value: 3,
                //     message: 'Systolic should be at least 3 digit',
                // },
              }}
            />

            <CustomInput
              name="Sp02 (%)"
              control={control}
              placeholder="... type here..."
              rules={{
                // required: 'Diastolic is required',
              }}
            />
            <CustomInput
              name="Oxygen (lpm)"
              control={control}
              placeholder="... type here..."
              rules={{
                // required: 'Pulse is required',
              }}
            />
            <CustomInput
              name="Oxygen Device"
              control={control}
              placeholder="...need a scrolldown list here..."
              rules={{
                //required: 'Respiration is required',
              }}
            />
            <CustomInput
              name="Heart Rate (bpm)"
              control={control}
              placeholder="... type here..."
              rules={{
                // required: 'Pulse is required',
              }}
            />
            <CustomInput
              name="Systolic BP (mmHg)"
              control={control}
              placeholder="... type here..."
              rules={{
                // required: 'Pulse is required',
              }}
            />
            <CustomInput
              name="Diastolic BP (mmHg)"
              control={control}
              placeholder="... type here..."
              rules={{
                // required: 'Pulse is required',
              }}
            />
            <CustomInput
              name="Temperature (°C)"
              control={control}
              placeholder="... type here..."
              rules={{
                //required: 'MAP is required',
              }}
            />
            <CustomInput
              name="Blood Glucose (mmol/L)"
              control={control}
              placeholder="... type here..."
              rules={{
                // required: 'Pulse is required',
              }}
            />
            <CustomInput
              name="Pain"
              control={control}
              placeholder="... type here..."
              rules={{
                //required: 'MAP is required',
              }}
            />
            <CustomInput
              name="Weight (kg)"
              control={control}
              placeholder="... type here..."
              rules={{
                // required: 'Pulse is required',
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