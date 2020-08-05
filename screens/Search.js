import React from 'react'
import { Switch, Button, View, ScrollView } from 'react-native'

import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Text, TopNavigation, TopNavigationAction, Icon, Layout, StyleService, useStyleSheet, Card} from '@ui-kitten/components'

import { Col, Row, Grid } from "react-native-easy-grid";

import moment from 'moment'

//redux
import { useDispatch, useSelector } from 'react-redux'
import handleChangeURL from '../actions/handleChangeURL'

export default Search = (props) => {

	const styles = useStyleSheet(themedStyles);

    const [ minMag, setMinMag ] = React.useState(0)
    const [ maxMag, setMaxMag ] = React.useState(12.0)
    const [ sortByTime, setSortByTime ] = React.useState(true)
	const [ enableStartTime, setEnableStartTime ] = React.useState(false)
	const [ enableEndTime, setEnableEndTime ] = React.useState(false)
	const [ showStartDatePicker, setShowStartDatePicker ] = React.useState(false)
	const [ showStartTimePicker, setShowStartTimePicker ] = React.useState(false)
	const [ showEndDatePicker, setShowEndDatePicker ] = React.useState(false)
    const [ showEndTimePicker, setShowEndTimePicker ] = React.useState(false)
	const [ startDate, setStartDate ] = React.useState(new Date())
	const [ startTime, setStartTime ] = React.useState(new Date())
	const [ endDate, setEndDate ] = React.useState(new Date())
    const [ endTime, setEndTime ] = React.useState(new Date())
    
    const URL = useSelector(state => state.URL)
    const dispatch = useDispatch()

    const BackAction = () => (
        <TopNavigationAction 
            icon={BackIcon}
            onPress={ev => props.navigation.goBack()}
        />
    );

    const handleChangeMinMag = (ev) => {
        setMinMag(ev.toFixed(1))
    }

    const handleChangeMaxMag = (ev) => {
        setMaxMag(ev.toFixed(1))
    }

    const handleChangeSortByTime = (ev) => {
        setSortByTime(ev)
    }

    const handleChangeEnableStartTime = (ev) => {
		setEnableStartTime(ev)
	}
	
	const handleChangeEnableEndTime = (ev) => {
		setEnableEndTime(ev)
	}

    const showStartPicker = (mode) => {
		if(mode === 'date') setShowStartDatePicker(true)
		else setShowStartTimePicker(true)
	}

	const showEndPicker = (mode) => {
		if(mode === 'date') setShowEndDatePicker(true)
		else setShowEndTimePicker(true)
	}

	const onChangeStartTime = (ev, selectedTime, mode) => {
		if(mode === 'date') {
			setShowStartDatePicker(false)
			const currentDate = selectedTime || date;
			setStartDate(currentDate);
		}
		else {
			setShowStartTimePicker(false)
			const currentTime = selectedTime || time
			setStartTime(currentTime)
		}
	}

	const onChangeEndTime = (ev, selectedTime, mode) => {
		if(mode === 'date') {
			setShowEndDatePicker(false)
			const currentDate = selectedTime || date;
			setEndDate(currentDate);
		}
		else {
			setShowEndTimePicker(false)
			const currentTime = selectedTime || time
			setEndTime(currentTime)
		}
    }
    
    const onSubmit = () => {
        const orderBy = sortByTime ? '&orderby=time' : ''
        const minmagnitude = '&minmagnitude=' + minMag
        const maxmagnitude = '&maxmagnitude=' + maxMag
        const starttime = enableStartTime ? '&starttime=' + startDate.getFullYear() + '-' + eval(startDate.getMonth() + 1) + '-' + startDate.getDate() + '-' + startTime.getHours() + '-' + startTime.getMinutes() : ''
        const endtime = enableEndTime ? '&endtime=' + endDate.getFullYear() + '-' + eval(endDate.getMonth() + 1) + '-' + endDate.getDate() + '-' + endTime.getHours() + '-' + endTime.getMinutes() : ''
        const newURL = URL + orderBy + minmagnitude + maxmagnitude + starttime + endtime
        dispatch(handleChangeURL(newURL))
        props.navigation.goBack()
    }

    const RenderMagRange = () => {
        return (
            <React.Fragment>
                <Text style={styles.subTitleText}>Magnitude Range</Text>
                <Text style={styles.descriptionText}>Sift data by limiting minimum and maximum earthquake magnitude</Text>

                <Card style={{marginTop: 10}}>
                    <Grid style={{marginBottom:20}}>
                        <Col><Text style={styles.subTitleText}>Minimum Magnitude:</Text></Col>
                        <Col><Text style={{textAlign:'right'}}>{minMag} ML</Text></Col>
                    </Grid>
                    
                    <Slider
                        style={{width: '100%', height: 40}}
                        minimumValue={0}
                        maximumValue={12}
                        minimumTrackTintColor={androidGreen}
                        maximumTrackTintColor="#000000"
                        onValueChange={ev => handleChangeMinMag(ev)}
                        value={Number(minMag)}
                    />

                    <Grid style={{marginBottom:20}}>
                        <Col><Text style={styles.subTitleText}>Maximum Magnitude:</Text></Col>
                        <Col><Text style={{textAlign:'right'}}>{maxMag} ML</Text></Col>
                    </Grid>

                    <Slider
                        style={{width: '100%', height: 40}}
                        minimumValue={0}
                        maximumValue={12}
                        minimumTrackTintColor={androidGreen}
                        maximumTrackTintColor="#000000"
                        onValueChange={ev => handleChangeMaxMag(ev)}
                        value={Number(maxMag)}
                    />  
                </Card>
            </React.Fragment>
        )
    }

    const RenderSortByTime = () => {
        return(
            <Card style={{marginTop:30, height:55, marginBottom:30}}>
                <Grid>
                    <Col><Text style={{fontSize:15, fontWeight:'bold', color: sortByTime ? 'black' : 'gray'}}>Sort By Time</Text></Col>
                    <Col>
                        <Switch
                            trackColor={{ false: "#c4c4c4", true: "#4ea381" }}
                            thumbColor={androidGreen}
                            onValueChange={handleChangeSortByTime}
                            value={sortByTime}
                        />
                    </Col>
                </Grid>
            </Card>
        )
    }

    const RenderStartTime = () => {
        return (
            <React.Fragment>
                <Text style={styles.subTitleText}>Set Start Time</Text>
                <Text style={styles.descriptionText}>You can sift earthquake data by setting start time</Text>

                <Card style={{marginTop:10, marginBottom:30}}>
                    <View style={{height:120}}>
                        <Grid>
                            <Row>
                                <Col><Text style={{fontSize:15, fontWeight:'bold', color: enableStartTime ? 'black' : 'gray'}}>Enable start time</Text></Col>
                                <Col>
                                    <Switch
                                        trackColor={{ false: "#c4c4c4", true: "#4ea381" }}
                                        thumbColor={androidGreen}
                                        onValueChange={handleChangeEnableStartTime}
                                        value={enableStartTime}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col size={6}><Text style={{textAlign:'center', color:enableStartTime ? 'black' : 'grey'}}>{moment(startDate).format('MMMM Do YYYY')}</Text></Col>
                                <Col size={1} />
                                <Col size={6}><Text style={{textAlign:'center', color:enableStartTime ? 'black' : 'grey'}}>{moment(startTime).format('h:mm A')}</Text></Col>
                            </Row>

                            <Row>
                                <Col size={6}>
                                    <Button 
										disabled={!enableStartTime} 
										title="Pick Date" 
										color={androidGreen}
										onPress={ev => showStartPicker('date', ev)}
									/>
                                </Col>
                                <Col size={1}/>
                                <Col size={6}>
									<Button 
										disabled={!enableStartTime} 
										title="Pick Time" 
										color={androidGreen}
										onPress={ev => showStartPicker('time', ev)}
									/>
								</Col>
                            </Row>

                            {showStartDatePicker && (
                                <DateTimePicker
									testID="datePicker"
									value={startDate}
									mode='date'
									is24Hour={true}
									display="default"
									onChange={(ev, selectedTime) => onChangeStartTime(ev, selectedTime, 'date')}
								/>
                            )}

							{showStartTimePicker && (
                                <DateTimePicker
									testID="timePicker"
									value={startTime}
									mode='time'
									is24Hour={false}
									display="default"
									onChange={(ev, selectedTime) => onChangeStartTime(ev, selectedTime, 'time')}
								/>
                            )}
                        </Grid>
                    </View>
                    
                    
                </Card>
            </React.Fragment>
        )
	}
	
	const RenderEndTime = () => {
		return (
            <React.Fragment>
                <Text style={styles.subTitleText}>Set End Time</Text>
                <Text style={styles.descriptionText}>You can sift earthquake data by setting end time</Text>

                <Card style={{marginTop:10, marginBottom:30}}>
                    <View style={{height:120}}>
                        <Grid>
                            <Row>
                                <Col><Text style={{fontSize:15, fontWeight:'bold', color: enableEndTime ? 'black' : 'gray'}}>Enable end time</Text></Col>
                                <Col>
                                    <Switch
                                        trackColor={{ false: "#c4c4c4", true: "#4ea381" }}
                                        thumbColor={androidGreen}
                                        onValueChange={handleChangeEnableEndTime}
                                        value={enableEndTime}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col size={6}><Text style={{textAlign:'center', color:enableEndTime ? 'black' : 'grey'}}>{moment(endDate).format('MMMM Do YYYY')}</Text></Col>
                                <Col size={1} />
                                <Col size={6}><Text style={{textAlign:'center', color:enableEndTime ? 'black' : 'grey'}}>{moment(endTime).format('h:mm A')}</Text></Col>
                            </Row>

                            <Row>
                                <Col size={6}>
                                    <Button 
										disabled={!enableEndTime} 
										title="Pick Date" 
										color={androidGreen}
										onPress={ev => showEndPicker('date', ev)}
									/>
                                </Col>
                                <Col size={1}/>
                                <Col size={6}>
									<Button 
										disabled={!enableEndTime} 
										title="Pick Time" 
										color={androidGreen}
										onPress={ev => showEndPicker('time', ev)}
									/>
								</Col>
                            </Row>

                            {showEndDatePicker && (
                                <DateTimePicker
									testID="datePicker"
									value={startDate}
									mode='date'
									is24Hour={true}
									display="default"
									onChange={(ev, selectedTime) => onChangeEndTime(ev, selectedTime, 'date')}
								/>
                            )}

							{showEndTimePicker && (
                                <DateTimePicker
									testID="timePicker"
									value={startTime}
									mode='time'
									is24Hour={false}
									display="default"
									onChange={(ev, selectedTime) => onChangeEndTime(ev, selectedTime, 'time')}
								/>
                            )}
                        </Grid>
                    </View>
                    
                    
                </Card>
            </React.Fragment>
        )
	}

    return(
        <ScrollView>
            <TopNavigation
                accessoryLeft={BackAction}
                title='Search'
            />

            <Layout level='2' style={{height:'100%', padding:20}}>
                <Text style={styles.titleText}>Search Settings</Text>
                <Text />
                
                {RenderMagRange()}
                {RenderSortByTime()}
                {RenderStartTime()}
				{RenderEndTime()}

				<Button title="Search" color={androidGreen} onPress={onSubmit}/>

            </Layout>
        </ScrollView>
    )
}

const BackIcon = (props) => (
    <Icon {...props} name='arrow-downward-outline'/>
);

const themedStyles = StyleService.create({
    titleText: {
        fontSize:20,
        fontWeight:'bold'
    },
    subTitleText: {
        fontSize:15,
        fontWeight:'bold'
    },
    descriptionText: {
        fontSize:12,
        color: 'rgba(0,0,0,0.5)'
    }
})

const androidGreen = '#028577'
