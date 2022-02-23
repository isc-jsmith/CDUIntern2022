import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	MaskedViewComponent,
	Alert,
	SafeAreaView,
	TouchableOpacity,
	Dimensions,
	ToastAndroid,
	moment,
	KeyboardAvoidingView,
} from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomPicker1 from '../../components/CustomPicker1';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

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
const RespiratoryRateRange = [ 10, 25 ];
const SpO2Range = [ 95, 100 ];
const HeartRateRange = [ 50, 120 ];
const SystolicRange = [ 100, 180 ];
const DiastolicRange = [ 60, 90 ];
const TemperatureRange = [ 36.1, 37.1 ];
const BloodGlucoseRange = [ 4.0, 8.0 ];
const OxygenLPMRange = [ 4, 12 ];

const height = Dimensions.get('window').height;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const ConfirmationScreen = ({ route }) => {
	const [ currentDate, setCurrentDate ] = useState('');
	const dataKey = route.params.dataKey;
	//console.log(dataKey);
	const PatientName = route.params.PatientName;
	const PatientId = route.params.PatientId;
	const encounterID = route.params.encounterID;
	const { control, handleSubmit, watch, formState: { errors } } = useForm();
	const navigation = useNavigation();
	const dataFromEntry = JSON.stringify(route.params.dataKey);
	const myObj = JSON.parse(dataFromEntry);

	const n = (n) => {
		return n > 9 ? '' + n : '0' + n;
	};

	const getCurrentTime = () => {
		var date = new Date().getDate(); //Current Date
		var month = new Date().getMonth() + 1; //Current Month
		var year = new Date().getFullYear(); //Current Year
		var hours = new Date().getHours(); //Current Hours
		var min = new Date().getMinutes(); //Current Minutes
		var sec = new Date().getSeconds(); //Current Seconds
		setCurrentDate(
			year + '-' + n(month) + '-' + n(date) + 'T' + n(hours) + ':' + n(min) + ':' + n(sec) + '.000+09:30'
		);
	};

	const postToServer = (dynamicData, displayName, code) => {
		getCurrentTime();
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/fhir+json',
				Accept: 'application/json',
				Authorization: 'Basic c3VwZXJ1c2VyOnBhc3N3b3Jk'
			},
			body: JSON.stringify({
				resourceType: 'Bundle',
				type: 'collection',
				total: 3,
				entry: [
					{
						fullUrl: 'b23e1788-50e7-40d7-8ca7-e8f4de78ea31',
						resource: {
							resourceType: 'Patient',
							identifier: [
								{
									type: {
										coding: [
											{
												code: 'MR',
												system: 'http://terminology.hl7.org/CodeSystem/v2-0203'
											}
										],
										text: 'MRN'
									},
									value: '' + PatientId + ''
								}
							],
							id: '' + PatientId + ''
						}
					},
					{
						fullUrl: 'b23e1788-50e7-40d7-8ca7-e8f4de78ea39',
						resource: {
							resourceType: 'Encounter',
							identifier: [
								{
									type: {
										text: 'EncounterNumber'
									},
									use: 'official',
									value: '' + encounterID + ''
								}
							],
							id: '' + encounterID + ''
						}
					},
					{
						fullUrl: 'b23e1788-50e7-40d7-8ca7-e8f4de78ea3e',
						resource: {
							resourceType: 'Observation',
							id: 'b23e1788-50e7-40d7-8ca7-e8f4de78ea3e',
							code: {
								coding: [
									{
										system: 'SDN',
										code: '' + code + '',
										display: '' + displayName + ''
									}
								]
							},
							effectiveDateTime: '' + currentDate + '',
							valueQuantity: {
								value: dynamicData,
								system: 'http://unitsofmeasure.org'
							}
						}
					}
				]
			})
		};

		fetch('http://172.19.42.127:52773/tcfhir/trakr4/Observation', requestOptions)
			.then((response) => response.json())
			//If response is in json then in success
			.then((responseJson) => {
				//Success
				//return JSON.stringify(responseJson);
				//alert(JSON.stringify(responseJson));
				console.log(responseJson);
			})
			//If response is not in json then in error
			.catch((error) => {
				//Error
				//alert(JSON.stringify(error));
				console.error(JSON.stringify(error));
				//return JSON.stringify(error);
			});
	};

	const onUpdatePressed = async (e) => {
		data = e;
		const dataFromEntry = JSON.stringify(data);
		const objToPost = JSON.parse(dataFromEntry);
		getCurrentTime();
		// var temperatureResponse = objToPost['Temperature (°C)']
		// 	? postToServer(objToPost['Temperature (°C)'], 'Temperature', 'VS5')
		// 	: '';
		var weightresponse = postToServer(objToPost['Weight (kg)'], 'weight', 'weight');
		var temperatureResponse = postToServer(objToPost['Temperature (°C)'], 'Temperature', 'VS5');
		Toast.show('Data Updated Successfully.');

		await delay(3000);
		navigation.reset({
			index: 0,
			routes: [
				{
					name: 'HomeScreen'
				}
			]
		});
	};

	const onEditPressed = () => {
		navigation.navigate('VitalSign', {
			functionKey: console.log(' function from Ocallbs'),
			otherFunctionKey: console.log('another funct from Obs')
		});
	};

	return (
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
				<Text
					style={{
						flex: 1,
						textAlign: 'left',
						fontSize: 16,
						color: 'gray',
						padding: 10
					}}
				>
					Confirmation Screen
				</Text>

				<TouchableOpacity
					style={{
						flex: 1,
						textAlign: 'right',
						alignItems: 'flex-end',
						padding: 5
					}}
					onPress={() => navigation.goBack()}
				>
					<Icon name="close" style={{ backgroundColor: 'brown', borderRadius: 8 }} size={30} color={'#FFF'} />
				</TouchableOpacity>
			</View>
			<SafeAreaView
				style={{
					alignItems: 'center',
					paddingRight: 10,
					borderTopColor: '#678cf8'
				}}
			>
				<Text style={styles.title}>Observation Confirmation</Text>
				<Text
					style={{
						fontSize: 16,
						fontWeight: 'bold',
						color: '#051C60'
					}}
				>
					Name: {PatientName}
				</Text>
			</SafeAreaView>
			{/* <ScrollView showsVerticalScrollIndicator={false}> */}
				<View style={styles.root}>
					<View style={{ height: height * 0.63, paddingBottom: 30, width: '100%' }}>
						<ScrollView persistentScrollbar={true}>
							<View style={[ styles.container ]}>
								<View style={styles.header}>
									<Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: 16 }}>
										Vital Sign
									</Text>
								</View>
								<View style={[ styles.valueheader ]}>
									<Text
										style={{
											fontStyle: 'italic',
											fontWeight: 'bold',
											fontSize: 16,
											paddingLeft: 15
										}}
									>
										Value
									</Text>
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Consciousness</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomPicker1
										name="Consciousness"
										defaultValue={myObj['Consciousness']}
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
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Respiratory Rate (bpm)</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomInput
										control={control}
										name="Respiratory Rate (bpm)"
										defaultValue={myObj['Respiratory Rate (bpm)']}
										referenceRange={RespiratoryRateRange}
										keyboardType={'numeric'}
										rules={{
											pattern: { value: RESPIRATORY_RATE_REGEX, message: 'Invalid Value' }
										}}
									/>
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Sp02 (%)</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomInput
										control={control}
										name="Sp02 (%)"
										defaultValue={myObj['Sp02 (%)']}
										referenceRange={SpO2Range}
										keyboardType={'numeric'}
										rules={{
											pattern: { value: SPO2_REGEX, message: 'Invalid Value' }
										}}
									/>
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Oxygen (lpm)</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomInput
										control={control}
										name="Oxygen (lpm)"
										defaultValue={myObj['Oxygen (lpm)']}
										referenceRange={OxygenLPMRange}
										keyboardType={'numeric'}
										rules={{
											pattern: { value: OXYGEN_REGEX, message: 'Invalid Value' }
										}}
									/>
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Oxygen Device</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomPicker1
										name="Oxygen Device"
										defaultValue={myObj['Oxygen Device']}
										control={control}
										itemList={[
											{ label: 'Select', value: '' },
											{ label: 'Liquid Oxygen', value: 'Liquid Oxygen' },
											{ label: 'Compressed Oxygen gas', value: 'Compressed Oxygen gas' },
											{ label: 'Concentrator', value: 'Concentrator' }
										]}
									/>
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Heart Rate (bpm)</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomInput
										control={control}
										name="Heart Rate (bpm)"
										defaultValue={myObj['Heart Rate (bpm)']}
										referenceRange={HeartRateRange}
										keyboardType={'numeric'}
										rules={{
											pattern: { value: HEART_RATE_REGEX, message: 'Invalid Value' }
										}}
									/>
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Systolic BP (mmHg)</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomInput
										control={control}
										name="Systolic BP (mmHg)"
										defaultValue={myObj['Systolic BP (mmHg)']}
										referenceRange={SystolicRange}
										keyboardType={'numeric'}
										rules={{
											pattern: { value: SYSTOLIC_REGEX, message: 'Invalid Value' }
										}}
									/>
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Diastolic BP (mmHg)</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomInput
										control={control}
										name="Diastolic BP (mmHg)"
										defaultValue={myObj['Diastolic BP (mmHg)']}
										referenceRange={DiastolicRange}
										keyboardType={'numeric'}
										rules={{
											pattern: { value: DIASTOLIC_REGEX, message: 'Invalid Value' }
										}}
									/>
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Temperature (°C)</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomInput
										control={control}
										name="Temperature (°C)"
										defaultValue={myObj['Temperature (°C)']}
										referenceRange={TemperatureRange}
										keyboardType={'numeric'}
										rules={{
											pattern: { value: TEMPERATURE_REGEX, message: 'Invalid Value' }
										}}
									/>
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Blood Glucose (mmol/L)</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomInput
										control={control}
										name="Blood Glucose (mmol/L)"
										defaultValue={myObj['Blood Glucose (mmol/L)']}
										referenceRange={BloodGlucoseRange}
										keyboardType={'numeric'}
										rules={{
											pattern: { value: BLOOD_GLUCOSE_REGEX, message: 'Invalid Value' }
										}}
									/>
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Pain</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomInput
										control={control}
										name="Pain"
										defaultValue={myObj['Pain']}
										keyboardType={'numeric'}
										rules={{
											pattern: { value: PAIN_REGEX, message: 'Invalid Value' }
										}}
									/>
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Weight (kg)</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomInput
										control={control}
										name="Weight (kg)"
										defaultValue={myObj['Weight (kg)']}
										keyboardType={'numeric'}
										rules={{
											pattern: { value: WEIGHT_REGEX, message: 'Invalid Value' }
										}}
									/>
								</View>

								<View style={styles.item}>
									<Text style={styles.label}>Note</Text>
								</View>
								<View style={styles.itemvalue}>
									<CustomInput
										control={control}
										name="Note"
										defaultValue={myObj['Note']}
										rules={{
											pattern: { value: NOTE_REGEX, message: 'Invalid Value' }
										}}
									/>
								</View>
							</View>
						</ScrollView>
					</View>

					<CustomButton text="Confirm" onPress={handleSubmit(onUpdatePressed)} />
				</View>
			{/* </ScrollView> */}
		</SafeAreaView>
		</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
		padding: 20
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#051C60',
		margin: 10
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start' // if you want to fill rows left to right
	},
	item: {
		width: '50%', // is 50% of container width
		borderTopColor: 'gray',
		borderTopWidth: 0.3
	},
	itemvalue: {
		width: '50%', // is 50% of container width
		borderTopColor: 'gray',
		borderTopWidth: 0.5,
		height: 50
	},
	header: {
		paddingVertical: 10,
		width: '50%',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderRightWidth: 1
	},
	valueheader: {
		paddingVertical: 10,
		width: '50%',
		borderTopWidth: 1,
		borderBottomWidth: 1
	},
	label: {
		fontWeight: 'bold',
		fontSize: 14,
		paddingVertical: 15
	}
});
export default ConfirmationScreen;
