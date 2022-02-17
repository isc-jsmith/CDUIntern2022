import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, MaskedViewComponent, Alert} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomInput1 from '../components/CustomInput1';
import CustomInput2 from '../components/CustomInput2';
import CustomPicker1 from '../components/CustomPicker1';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
// import { DataTable, List } from 'react-native-paper';
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
const NOTE_REGEX = /^[ A-Za-z0-9_@./#&+-]*$/;


// Reference Range
const RespiratoryRateRange = [10, 25];
const SpO2Range = [95, 100];
const HeartRateRange = [50, 120];
const SystolicRange = [100, 180];
const DiastolicRange = [60, 90];
const TemperatureRange = [36.1, 37.1];
const BloodGlucoseRange = [4.0, 8.0];
const OxygenLPMRange = [4, 12];






const ObsnConfirmation = ({route}) => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();

 
  const onUpdatePressed = (data) => {
    console.log(data);
    Alert.alert("Message", "Vital Signs updated");
  }; 

  // pass the param/ Function when navigate from 'Observation' to 'VitalSign'
  const onEditPressed = () => {
    navigation.navigate('VitalSign',{
      functionKey: console.log(" function from Ocallbs"),
      otherFunctionKey: console.log("another funct from Obs")
    });
  };

  
  // *** dataKey from Observation Screen
  /* Use JSON.stringify to render JSON string and then JSON.parse to return Object */
  const dataFromEntry = JSON.stringify(route.params.dataKey);
  const myObj = JSON.parse(dataFromEntry)
  const patientInfo = route.params.patientInfo;
  const lastObsTime = route.params.lastObsTime;
  const age = route.params.age;




  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Observation Confirmation</Text>
        <Text>Name:  {patientInfo.split(",")[1]}</Text>
        <Text>DOB: {patientInfo.split(",")[0]}</Text>
        <Text>Age: {age}</Text>
        <Text style={{alignSelf: 'flex-end'}}><Icon name="man-outline" size={23} color="#13a5a3"/></Text>
        <Text style={{alignSelf: 'flex-end'}}>Last Observation: {lastObsTime}</Text>

        <View style={{height: 480, padding:20, paddingBottom:30, width: "110%"}} >
          <ScrollView persistentScrollbar={true}>
            <View style={[styles.container,]}>
              <View style={styles.header}><Text style={{fontStyle:'italic' ,fontWeight:"bold", fontSize:16}}>Vital Sign</Text></View>
              <View style={[styles.valueheader]}><Text style={{fontStyle:'italic', fontWeight:"bold", fontSize:16, paddingLeft: 15}}>Value</Text></View>

              <View style={styles.item}><Text style={styles.label}>Consciousness</Text></View>
              <View style={styles.itemvalue}>
                <CustomPicker1
                  name="Consciousness"
                  defaultValue = {myObj["Consciousness"]}
                  control={control}
                  itemList={[{label:"Select", value: ""},
                            {label:"Level1" ,value: "Level1"},
                            {label:"Level2" ,value: "Level2"},
                            {label:"Level3" ,value: "Level3"}]}
                />
              </View>

              <View style={styles.item}><Text style={styles.label}>Respiratory Rate (bpm)</Text></View>
              <View style={styles.itemvalue}>
                <CustomInput1
                  control={control} 
                  name="Respiratory Rate (bpm)"
                  defaultValue={myObj["Respiratory Rate (bpm)"]}
                  referenceRange={RespiratoryRateRange}
                  rules={{
                    pattern: {value: RESPIRATORY_RATE_REGEX, message: 'Invalid Value'},
                  }}
                /> 
              </View>

              <View style={styles.item}><Text style={styles.label}>Sp02 (%)</Text></View>
              <View style={styles.itemvalue}>
                <CustomInput1
                  control={control} 
                  name="Sp02 (%)" 
                  defaultValue={myObj["Sp02 (%)"]}
                  referenceRange={SpO2Range}
                  rules={{
                    pattern: {value: SPO2_REGEX, message: 'Invalid Value'},
                  }}
                /> 
              </View>

              <View style={styles.item}><Text style={styles.label}>Oxygen (lpm)</Text></View>
              <View style={styles.itemvalue}>
                <CustomInput1
                  control={control} 
                  name="Oxygen (lpm)" 
                  defaultValue={myObj["Oxygen (lpm)"]}
                  referenceRange={OxygenLPMRange}
                  rules={{
                    pattern: {value: OXYGEN_REGEX, message: 'Invalid Value'},
                  }}
                /> 
              </View>

              <View style={styles.item}><Text style={styles.label}>Oxygen Device</Text></View>
              <View style={styles.itemvalue}>
                <CustomPicker1 
                  name="Oxygen Device"
                  defaultValue = {myObj["Oxygen Device"]}
                  control={control}
                  itemList={[{label:"Select", value:""},
                            {label:"Device1", value:"Device1"},
                            {label:"Device2", value:"Device2"},
                            {label:"Device3", value:"Device3"}]}
                />
              </View>

              <View style={styles.item}><Text style={styles.label}>Heart Rate (bpm)</Text></View>
              <View style={styles.itemvalue}>
                <CustomInput1
                  control={control} 
                  name="Heart Rate (bpm)" 
                  defaultValue={myObj["Heart Rate (bpm)"]}
                  referenceRange={HeartRateRange}
                  rules={{
                    pattern: {value: HEART_RATE_REGEX, message: 'Invalid Value'},
                  }}
                /> 
              </View>

              <View style={styles.item}><Text style={styles.label}>Systolic BP (mmHg)</Text></View>
              <View style={styles.itemvalue}>
                <CustomInput1
                  control={control} 
                  name="Systolic BP (mmHg)" 
                  defaultValue={myObj["Systolic BP (mmHg)"]}
                  referenceRange={SystolicRange}
                  rules={{
                    pattern: {value: SYSTOLIC_REGEX, message: 'Invalid Value'},
                  }}
                /> 
              </View>

              <View style={styles.item}><Text style={styles.label}>Diastolic BP (mmHg)</Text></View>
              <View style={styles.itemvalue}>
                <CustomInput1
                  control={control} 
                  name="Diastolic BP (mmHg)" 
                  defaultValue={myObj["Diastolic BP (mmHg)"]}
                  referenceRange={DiastolicRange}
                  rules={{
                    pattern: {value: DIASTOLIC_REGEX, message: 'Invalid Value'},
                  }}
                /> 
              </View>

              <View style={styles.item}><Text style={styles.label}>Temperature (°C)</Text></View>
              <View style={styles.itemvalue}>
                <CustomInput1
                  control={control} 
                  name="Temperature (°C)" 
                  defaultValue={myObj["Temperature (°C)"]}
                  referenceRange={TemperatureRange}
                  rules={{
                    pattern: {value: TEMPERATURE_REGEX, message: 'Invalid Value'},
                  }}
                /> 
              </View>

              <View style={styles.item}><Text style={styles.label}>Blood Glucose (mmol/L)</Text></View>
              <View style={styles.itemvalue}>
                <CustomInput1
                  control={control} 
                  name="Blood Glucose (mmol/L)" 
                  defaultValue={myObj["Blood Glucose (mmol/L)"]}
                  referenceRange={BloodGlucoseRange}
                  rules={{
                    pattern: {value: BLOOD_GLUCOSE_REGEX, message: 'Invalid Value'},
                  }}
                /> 
              </View>

              <View style={styles.item}><Text style={styles.label}>Pain</Text></View>
              <View style={styles.itemvalue}>
                <CustomInput1
                  control={control} 
                  name="Pain" 
                  defaultValue={myObj["Pain"]}
                  rules={{
                    pattern: {value: PAIN_REGEX, message: 'Invalid Value'},
                  }}
                /> 
              </View>

              <View style={styles.item}><Text style={styles.label}>Weight (kg)</Text></View>
              <View style={styles.itemvalue}>
                <CustomInput1
                  control={control} 
                  name="Weight (kg)" 
                  defaultValue={myObj["Weight (kg)"]}
                  rules={{
                    pattern: {value: WEIGHT_REGEX, message: 'Invalid Value'},
                  }}
                /> 
              </View>

              <View style={styles.item}><Text style={styles.label}>Note</Text></View>
              <View style={styles.itemvalue}>
                <CustomInput2
                  control={control} 
                  name="Note" 
                  defaultValue={myObj["Note"]}
                  rules={{
                    pattern: {value: NOTE_REGEX, message: 'Invalid Value'},
                  }}
                /> 
              </View>

             
            </View>

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

// const styles = StyleSheet.create({
//   root: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#051C60',
//     margin: 10,
//   },
//   text: {
//     color: 'gray',
//     marginVertical: 10,
//   },
//   link: {
//     color: '#FDB075',
//   },
//   textRight: {
//     color: 'gray',
//     textAlign: 'right',
//   },
//   tableFirstColumn: {
//     flex: 3,
//   },
//   tableSecondColumn: {
//     flex: 2,
//   },
//   datatext: {
//     color: 'blue'
//   }
// });


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
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '60%', // is 50% of container width
    borderTopColor: 'gray',
    borderTopWidth: 0.3,
  },
  itemvalue: {
    width: '40%', // is 50% of container width
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
  },
  header: {
    paddingVertical: 20,
    width: '60%',
  },
  valueheader: {
    paddingVertical: 20,
    width: '40%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingVertical: 10,
  },
  
})

export default ObsnConfirmation;