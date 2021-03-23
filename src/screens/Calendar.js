import React, { useState } from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import { Calendar as Cal } from 'react-native-calendars'

const Calendar = () => {
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [isStartActive, setIsStartActive] = useState(true)
	const [isEndActive, setIsEndActive] = useState(false)

	const activeStartDay = () => {
		setIsEndActive(false)
		setIsStartActive(true)
	}

	const activeEndDay = () => {
		if (startDate) {
			setIsStartActive(false)
			setIsEndActive(true)
		} else {
			Alert.alert('Invalid', 'Please enter start date first.')
		}
	}

	const savePeriod = (day) => {
		console.log(day)
		if (isStartActive) {
			setStartDate(day.dateString)
			setIsStartActive(false)
			setIsEndActive(true)
		} else if (isEndActive) {
			setEndDate(day.dateString)
			setIsEndActive(false)
		} else {
			return null
		}
	}

	const dates = {
		[startDate]: { startingDay: true, disabled: true, color: 'grey' },
		[endDate]: { endingDay: true, disabled: true, color: 'grey' },
	}

	return (
		<View style={styles.container}>
			<StatusBar barStyle='light-content' backgroundColor='#2e2c83' />
			<Cal
				minDate={startDate}
				maxDate={endDate}
				markingType={'period'}
				markedDates={dates}
				// markedDates={{
				// 	startDate: {disabled: true, color: 'grey', startingDay: true},
				// 	endDate: {disabled: true, color: 'grey', endingDay: true}
				// }}
				hideExtraDays
				onDayPress={(day) => savePeriod(day)}
			/>
			<TouchableOpacity style={[styles.button, { backgroundColor: isStartActive ? '#bbffbb' : '#ffffff' }]} onPress={activeStartDay}>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Text style={styles.text}>{startDate ? startDate : 'Select Start Date'}</Text>
				</View>
				<Image source={require('../assets/images/interface.png')} />
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, { backgroundColor: isEndActive ? '#bbffbb' : '#ffffff' }]} onPress={activeEndDay} >
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Text style={styles.text}>{endDate ? endDate : 'Select End Date'}</Text>
				</View>
				<Image source={require('../assets/images/interface.png')} />
			</TouchableOpacity>
		</View>
	)
}

export default Calendar

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15
	},
	button: {
		flexDirection: 'row',
		// backgroundColor: '#fff',
		marginTop: 15,
		height: '13%',
		borderRadius: 4,
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15
	},
	image: {
		resizeMode: 'contain'
	},
	text: {
		fontSize: 20,
		color: '#555555'
	}
})
