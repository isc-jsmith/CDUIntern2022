import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, SafeAreaView, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomPicker from '../../components/CustomPicker';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../HomeScreen';

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
// alphanumeric but no special character
const NOTE_REGEX = /^[ A-Za-z0-9_@./#&+-]*$/;

// Reference Range
const RespiratoryRateRange = [ 10, 25 ];
const SpO2Range = [ 95, 100 ];
const HeartRateRange = [ 50, 120 ];
const SystolicRange = [ 100, 180 ];
const DiastolicRange = [ 60, 90 ];
const TemperatureRange = [ 36.1, 37.1 ];
const BloodGlucoseRange = [ 4.0, 8.0 ];
const OxygenLPMRange = [ 4, 12 ];

const height = Dimensions.get('window').height;

const VitalSignInput = ({ route }) => {
	const PatientId = route.params.patientId;

	const [ lastObsTime, setLastObsTime ] = useState('');
	const [ PatientName, setPatientName ] = useState('');
	const [ PatientDOB, setPatientDOB ] = useState('');
	const [ PatientAge, setPatientAge ] = useState('');
	const [ encounterID, setEncounterID ] = useState('');
	const { control, handleSubmit, watch, formState: { errors } } = useForm();
	const navigation = useNavigation();

	const pageTitle = 'Vital Sign Input';

	const onUpdatePressed = (e) => {
		navigation.navigate('ConfirmationScreen', {
			dataKey: e,
			PatientName: PatientName,
			PatientId: PatientId,
			encounterID: encounterID
		});
	};
	useEffect(() => {
		PatientRead(PatientId);
		getLastObs(PatientId);
		getAge();
	});

	const getLastObs = (PatientId) => {
		var myHeaders = new Headers();
		myHeaders.append('Accept', 'application/fhir+json; charset=UTF-8');
		const patientId = PatientId;
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		};

		// *** Temporarily: Need to input the current local IP address ***//
		fetch(
			'http://172.19.42.127:52773/tcfhir/trakr4/Observation/$lastn?max=1&patient=Patient/' +
				patientId +
				'&category=vital-signs',
			requestOptions
		)
			.then((response) => response.text())
			.then((string) => JSON.parse(string))
			.then((obj) => {
				//console.log(obj)
				var lastObsTime = obj['entry'][0]['resource']['effectiveDateTime'];
				var encounterID = obj['entry'][0]['resource']['extension'][1]['valueString'];
				setLastObsTime(lastObsTime);
				setEncounterID(encounterID);
			})
			.catch((error) => {
				console.log('error', error)
			});
	};
	const PatientRead = (PatientId) => {
		//console.log(PatientId);
		var myHeaders = new Headers();
		fetch('http://172.19.42.127:52773/tcfhir/trakr4/Patient/' + PatientId + '?_format=json', {
			method: 'GET',
			headers: myHeaders
		})
			.then((response) => response.text())
			.then((string) => JSON.parse(string))
			.then((obj) => {
				// console.log(obj)
				var PatientName = obj['name'][0]['text'];
				var dateOfBirth = obj['birthDate'];
				//console.log(PatientName)
				setPatientName(PatientName);
				setPatientDOB(dateOfBirth);
			})
			//If response is not in json then in error
			.catch((error) => {
				console.error(JSON.stringify(error));
			});
	};

	const getAge = () => {
		var ageInMilliseconds = new Date() - new Date(PatientDOB);
		var age = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
		setPatientAge(age);
	};

	return (

		// *** to avoid keyboard cover input field *** ///
		<KeyboardAvoidingView
			style={{flex:1}}
			behavior="height"
			enabled={true}
		>
		<ScrollView>
		<SafeAreaView>
			<View
				style={{
					flexDirection: 'row',
					borderTopColor: '#678cf8',
					borderTopWidth: height * 0.04
				}}
			>
				<Text style={styles.sceenTitle}>
					Observation Entry
				</Text>
				
				{/* *** Close button *** */}
				<TouchableOpacity
					style={styles.closeButton}
					onPress={() =>
						navigation.reset({
							index: 0,
							routes: [{name: 'HomeScreen'}]
						})
					}
				>
					<Icon name="close" style={{ backgroundColor: 'brown', borderRadius: 8 }} size={30} color={'#FFF'} />
				</TouchableOpacity>
			</View>

			<SafeAreaView style={styles.banner}>
				<Text style={styles.title}>Patient's Information</Text>
				<Text>Name: {PatientName}</Text>
				<Text>
					DOB: {PatientDOB} Age: {PatientAge}
				</Text>
				<Text>{PatientId}</Text>
				{/* <Text style={{ alignSelf: 'flex-end' }}><Icon name="man-outline" size={23} color="#13a5a3" /></Text> */}
				<Text>Last Observation: {lastObsTime} </Text>
			</SafeAreaView>

			<View style={{ padding: 20, maxHeight: height * 0.70, width: '100%' }}>
				<ScrollView persistentScrollbar={true} style={{ alignContent: 'center' }}>
					<CustomPicker
						name="Consciousness"
						control={control}
						itemList={[
							{ label: 'Select', value: '' },
							{ label: 'Conscious', value: 'Conscious' },
							{ label: 'Un-Conscious', value: 'Un-Conscious' },
							{ label: 'Confusion', value: 'Confusion' },
							{ label: 'Obtundation', value: 'Obtundation' },
							{ label: 'Coma', value: 'Coma' }
						]}
					/>

					<CustomInput
						showName="Respiratory Rate (bpm)"
						name={'Respiratory Rate (bpm)'}
						control={control}
						placeholder="... type here..."
						referenceRange={RespiratoryRateRange}
						keyboardType={'numeric'}
						rules={{
							pattern: { value: RESPIRATORY_RATE_REGEX, message: 'Invalid Value' }
						}}
					/>

					<CustomInput
						showName="Sp02 (%)"
						name={'Sp02 (%)'}
						control={control}
						placeholder="... type here..."
						referenceRange={SpO2Range}
						keyboardType={'numeric'}
						rules={{
							pattern: { value: SPO2_REGEX, message: 'Invalid Value' }
						}}
					/>
					<CustomInput
						showName="Oxygen (lpm)"
						name={'Oxygen (lpm)'}
						control={control}
						placeholder="... type here..."
						referenceRange={OxygenLPMRange}
						keyboardType={'numeric'}
						rules={{
							pattern: { value: OXYGEN_REGEX, message: 'Invalid Value' }
						}}
					/>

					<CustomPicker
						name="Oxygen Device"
						control={control}
						itemList={[
							{ label: 'Select', value: '' },
							{ label: 'Liquid Oxygen', value: 'Liquid Oxygen' },
							{ label: 'Compressed Oxygen gas', value: 'Compressed Oxygen gas' },
							{ label: 'Concentrator', value: 'Concentrator' }
						]}
					/>

					<CustomInput
						showName="Heart Rate (bpm)"
						name={'Heart Rate (bpm)'}
						control={control}
						placeholder="... type here..."
						referenceRange={HeartRateRange}
						keyboardType={'numeric'}
						rules={{
							pattern: { value: HEART_RATE_REGEX, message: 'Invalid Value' }
						}}
					/>
					<CustomInput
						showName="Systolic BP (mmHg)"
						name={'Systolic BP (mmHg)'}
						control={control}
						placeholder="... type here..."
						referenceRange={SystolicRange}
						keyboardType={'numeric'}
						rules={{
							pattern: { value: SYSTOLIC_REGEX, message: 'Invalid Value' }
						}}
					/>
					<CustomInput
						name={'Diastolic BP (mmHg)'}
						showName={'Diastolic BP (mmHg)'}
						control={control}
						placeholder="... type here..."
						referenceRange={DiastolicRange}
						keyboardType={'numeric'}
						rules={{
							pattern: { value: DIASTOLIC_REGEX, message: 'Invalid Value' }
						}}
					/>
					<CustomInput
						name={'Temperature (°C)'}
						showName="Temperature (°C)"
						control={control}
						placeholder="... type here..."
						referenceRange={TemperatureRange}
						keyboardType="numeric"
						rules={{
							pattern: { value: TEMPERATURE_REGEX, message: 'Invalid Value' }
						}}
					/>
					<CustomInput
						name={'Blood Glucose (mmol/L)'}
						showName="Blood Glucose (mmol/L)"
						control={control}
						placeholder="... type here..."
						keyboardType={'numeric'}
						referenceRange={BloodGlucoseRange}
						rules={{
							pattern: { value: BLOOD_GLUCOSE_REGEX, message: 'Invalid Value' }
						}}
					/>
					<CustomInput
						name={'Pain'}
						showName="Pain"
						control={control}
						placeholder="... type here..."
						keyboardType={'numeric'}
						rules={{
							pattern: { value: PAIN_REGEX, message: 'Invalid Value' }
						}}
					/>
					<CustomInput
						name={'Weight (kg)'}
						showName="Weight (kg)"
						control={control}
						placeholder="... type here..."
						keyboardType={'numeric'}
						rules={{
							pattern: { value: WEIGHT_REGEX, message: 'Invalid Value' }
						}}
					/>

					<CustomInput
						name={'Note'}
						showName="Note"
						control={control}
						placeholder="... type here..."
						rules={{
							pattern: { value: NOTE_REGEX, message: 'Invalid Value' }
						}}
					/>
				</ScrollView>
				<CustomButton text="Update" onPress={handleSubmit(onUpdatePressed)} />
			</View>
		</SafeAreaView>
		</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
		borderTopLeftRadius: 10
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#051C60',
		paddingBottom: 5
	},
	text: {
		color: 'gray',
		marginVertical: 10
	},
	link: {
		color: '#FDB075'
	},
	textRight: {
		color: 'gray',
		textAlign: 'right'
	},
	sceenTitle:{
		flex: 1,
		textAlign: 'left',
		fontSize: 16,
		color: 'gray',
		padding: 10
	},
	closeButton:{
		flex: 1,
		textAlign: 'right',
		alignItems: 'flex-end',
		padding: 5
	},
	banner:{
		alignItems: 'center',
		paddingRight: 10,
		borderTopColor: '#678cf8'
	},
});

export default VitalSignInput;
