import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, MaskedViewComponent} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import { DataTable } from 'react-native-paper';


const ObsnConfirmation = ({route}) => {
  const {control, handleSubmit, watch} = useForm();
  // const pwd = watch('password');
  const navigation = useNavigation();

 
  const onUpdatePressed = () => {
    alert("Vital Signs updated");
  }; 

  const onSkipVitalSignPress = () => {
    alert("Skip Vital Sign Update");
  };

  /* Use JSON.stringify to render Object */
  // dataKey from Observation Screen
  const dataFromEntry = JSON.stringify(route.params.dataKey);
  const myObj = JSON.parse(dataFromEntry)

  const RespiratoryRateRange = [10, 25];
  const SpO2Range = [95, 100];
  const HeartRateRange = [50, 120];
  const SystolicRange = [100, 180];
  const DiastolicRange = [60, 90];
  const TemperatureRange = [36.1, 37.1];
  const BloodGlucoseRange = [4.0, 8.0];
  const OxygenLPMRange = [4, 12];

  const [respiratoryRate, setRespiratoryrate] = useState(myObj["Respiratory Rate (bpm)"]);
  console.log(myObj["Respiratory Rate (bpm)"]);

  const checkInRange = (value, range) => {
    if (value >= range[0] && value <= range[1]){
      return true
    }
    else {
      return false
    }
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
                <DataTable.Cell style={[styles.tableSecondColumn, styles.datatext]}>
                  <Text style= {{color: 'blue' }}>
                    {myObj["Consciousness"]}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Respiratory Rate (bpm)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  {/* *** style value accroding to in Range or not */}
                  <Text style= {{color: checkInRange(parseFloat(myObj["Respiratory Rate (bpm)"]), RespiratoryRateRange ) ? 'blue' : 'red'}}>
                    {myObj["Respiratory Rate (bpm)"]}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Sp02 (%)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <Text style= {{color: checkInRange(parseFloat(myObj["Sp02 (%)"]), SpO2Range ) ? 'blue' : 'red'}}>
                    {myObj["Sp02 (%)"]}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Oxygen (lpm)</DataTable.Cell>
                <DataTable.Cell style={ styles.tableSecondColumn}>
                  <Text style= {{color: checkInRange(parseFloat(myObj["Oxygen (lpm)"]), OxygenLPMRange ) ? 'blue' : 'red'}}>
                    {myObj["Oxygen (lpm)"]}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Oxygen Device</DataTable.Cell>
                <DataTable.Cell style={[styles.tableSecondColumn, styles.datatext]}>
                  <Text style= {{color: 'blue' }}>
                    {myObj["Oxygen Device"]}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Heart Rate (bpm)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <Text style= {{color: checkInRange(parseFloat(myObj["Heart Rate (bpm)"]), HeartRateRange ) ? 'blue' : 'red'}}>
                    {myObj["Heart Rate (bpm)"]}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Systolic BP (mmHg)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <Text style= {{color: checkInRange(parseFloat(myObj["Systolic BP (mmHg)"]), SystolicRange ) ? 'blue' : 'red'}}>
                    {myObj["Systolic BP (mmHg)"]}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Diastolic BP (mmHg)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <Text style= {{color: checkInRange(parseFloat(myObj["Diastolic BP (mmHg)"]), DiastolicRange ) ? 'blue' : 'red'}}>
                    {myObj["Diastolic BP (mmHg)"]}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Temperature (°C)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <Text style= {{color: checkInRange(parseFloat(myObj["Temperature (°C)"]), TemperatureRange ) ? 'blue' : 'red'}}>
                    {myObj["Temperature (°C)"]}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Blood Glucose (mmol/L)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <Text style= {{color: checkInRange(parseFloat(myObj["Blood Glucose (mmol/L)"]), BloodGlucoseRange ) ? 'blue' : 'red'}}>
                    {myObj["Blood Glucose (mmol/L)"]}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Pain</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <Text style= {{color: 'blue' }}>
                    {myObj["Pain"]}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>Edit</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell style={styles.tableFirstColumn}>Weight (kg)</DataTable.Cell>
                <DataTable.Cell style={styles.tableSecondColumn}>
                  <Text style= {{color: 'blue'}}>
                    {myObj["Weight (kg)"]}
                  </Text>
                </DataTable.Cell>
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
  },
  datatext: {
    color: 'blue'
  }
});

export default ObsnConfirmation;