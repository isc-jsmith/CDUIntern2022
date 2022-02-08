import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, MaskedViewComponent} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import { DataTable } from 'react-native-paper';


const ObsnConfirmation = () => {
  const {control, handleSubmit, watch} = useForm();
  // const pwd = watch('password');
  const navigation = useNavigation();

 
  const onUpdatePressed = () => {
    alert("Vital Signs updated");
  }; 

  const onSkipVitalSignPress = () => {
    alert("Skip Vital Sign Update");
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Observation Confirmation</Text>
        <Text>Name: Marcus AGUIRRE</Text>
        <Text>DOB: 04/07/1969 Age: 52y6mth30d</Text>
        <Text></Text>
        <Text style={{alignSelf: 'flex-end'}}>...icons...</Text>
        <Text style={{alignSelf: 'flex-end'}}>Last Observation: {new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}</Text>
        
        <View style={{height: 480, padding:20, width: "110%"}} >
          <ScrollView persistentScrollbar={true}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={styles.tableFirstColumn}><Text style={{fontWeight:"bold", fontSize:14}}>Vital Sign</Text></DataTable.Title>
                <DataTable.Title style={styles.tableSecondColumn}><Text style={{fontWeight:"bold", fontSize:14}}>Value</Text></DataTable.Title>
                <DataTable.Title ><Text style={{fontWeight:"bold", fontSize:14}}>Button</Text></DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Consciousness</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}></DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Respiratory Rate (bpm)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>14</DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Sp02 (%)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}></DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Oxygen (lpm)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>98</DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Oxygen Device</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}></DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Heart Rate (bpm)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}></DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Systolic BP (mmHg)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>125</DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Diastolic BP (mmHg)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>80</DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Temperature (°C)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}></DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Blood Glucose (mmol/L)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}></DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Pain</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}></DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Weight (kg)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}></DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>
              
            </DataTable>  
          </ScrollView>
        </View>


        <CustomButton
          text="Confirm"
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
  },
  tableFirstColumn: {
    flex: 4,
  },
  tableSecondColumn: {
    flex: 2,
  }
});

export default ObsnConfirmation;