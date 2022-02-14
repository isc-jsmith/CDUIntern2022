import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, MaskedViewComponent} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomPicker from '../components/CustomPicker';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';


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


// Reference Range
const RespiratoryRateRange = [10, 25];
const SpO2Range = [95, 100];
const HeartRateRange = [50, 120];
const SystolicRange = [100, 180];
const DiastolicRange = [60, 90];
const TemperatureRange = [36.1, 37.1];
const BloodGlucoseRange = [4.0, 8.0];
const OxygenLPMRange = [4, 12];




const ObservationEnty = () => {
  const {control, handleSubmit, watch} = useForm();
  const navigation = useNavigation();

 
  const onUpdatePressed = () => {
    alert("Vital Signs updated");
  }; 



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Observation Confirmation</Text>
        <Text>Name: Marcus AGUIRRE</Text>
        <Text>DOB: 04/07/1969 Age: 52y6mth30d</Text>
        <Text></Text>
        <Text style={{alignSelf: 'flex-end'}}><Icon name="man-outline" size={23} color="#13a5a3"/></Text>
        <Text style={{alignSelf: 'flex-end'}}>Last Observation: {new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}</Text>

        <View style={{height: 480, padding:20, width: "110%"}} >
          <ScrollView persistentScrollbar={true}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={styles.tableFirstColumn}><Text style={{fontWeight:"bold", fontSize:14}}>Vital Sign</Text></DataTable.Title>
                <DataTable.Title style={styles.tableSecondColumn}><Text style={{fontWeight:"bold", fontSize:14}}>Value</Text></DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Consciousness</DataTable.Cell>
                <DataTable.Cell style={[styles.tableSecondColumn, styles.datatext]}>
                  <CustomPicker
                    name="Consciousness"
                    control={control}
                    itemList={[{label:"Select", value: ""},
                              {label:"Level1" ,value: "Level1"},
                              {label:"Level2" ,value: "Level2"},
                              {label:"Level3" ,value: "Level3"}]}
                  />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Respiratory Rate (bpm)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <CustomInput
                    name="Respiratory Rate (bpm)"
                    control={control}
                    placeholder="... type here..."
                    referenceRange={RespiratoryRateRange}
                    rules={{
                      pattern: {value: RESPIRATORY_RATE_REGEX, message: 'Invalid Value'},
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Sp02 (%)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <CustomInput
                    name="Sp02 (%)"
                    control={control}
                    placeholder="... type here..."
                    referenceRange={SpO2Range}
                    rules={{
                      pattern: {value: SPO2_REGEX, message: 'Invalid Value'},
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Oxygen (lpm)</DataTable.Cell>
                <DataTable.Cell style={ styles.tableSecondColumn}>
                  <CustomInput
                    name="Oxygen (lpm)"
                    control={control}
                    placeholder="... type here..."
                    referenceRange={OxygenLPMRange}
                    rules={{
                      pattern: {value: OXYGEN_REGEX, message: 'Invalid Value'},
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Oxygen Device</DataTable.Cell>
                <DataTable.Cell style={[styles.tableSecondColumn, styles.datatext]}>
                  <CustomPicker 
                    name="Oxygen Device"
                    control={control}
                    itemList={[{label:"Select", value:""},
                              {label:"Device1", value:"Device1"},
                              {label:"Device2", value:"Device2"},
                              {label:"Device3", value:"Device3"}]}
                  />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Heart Rate (bpm)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <CustomInput
                    name="Heart Rate (bpm)"
                    control={control}
                    placeholder="... type here..."
                    referenceRange={HeartRateRange}
                    rules={{
                      pattern: {value: HEART_RATE_REGEX, message: 'Invalid Value'},
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Systolic BP (mmHg)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <CustomInput
                    name="Systolic BP (mmHg)"
                    control={control}
                    placeholder="... type here..."
                    referenceRange={SystolicRange}
                    rules={{
                      pattern: {value: SYSTOLIC_REGEX, message: 'Invalid Value'},
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Diastolic BP (mmHg)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <CustomInput
                    name="Diastolic BP (mmHg)"
                    control={control}
                    placeholder="... type here..."
                    referenceRange={DiastolicRange}
                    rules={{
                      pattern: {value: DIASTOLIC_REGEX, message: 'Invalid Value'},
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Temperature (°C)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <CustomInput
                    name="Temperature (°C)"
                    control={control}
                    placeholder="... type here..."
                    referenceRange={TemperatureRange}
                    rules={{
                      pattern: {value: TEMPERATURE_REGEX, message: 'Invalid Value'},
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Blood Glucose (mmol/L)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <CustomInput
                    name="Blood Glucose (mmol/L)"
                    control={control}
                    placeholder="... type here..."
                    referenceRange={BloodGlucoseRange}
                    rules={{
                      pattern: {value: BLOOD_GLUCOSE_REGEX, message: 'Invalid Value'},
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Pain</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <CustomInput
                    name="Pain"
                    control={control}
                    placeholder="... type here..."
                    rules={{
                      pattern: {value: PAIN_REGEX, message: 'Invalid Value'},
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Weight (kg)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <CustomInput
                    name="Weight (kg)"
                    control={control}
                    placeholder="... type here..."
                    rules={{
                      pattern: {value: WEIGHT_REGEX, message: 'Invalid Value'},
                    }}
                  />
                </DataTable.Cell>
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
    flex: 3,
  },
  datatext: {
    color: 'blue'
  }
});

export default ObservationEnty;