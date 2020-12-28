import React from 'react'
import { Switch, Button, View, ScrollView } from 'react-native'

import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Text, TopNavigation, TopNavigationAction, Icon, Layout, StyleService, useStyleSheet, Card} from '@ui-kitten/components'

import { Col, Row, Grid } from "react-native-easy-grid";

import moment from 'moment'

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
    
    const URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=100'

    const BackAction = () => (
        <TopNavigationAction 
            icon={BackIcon}
            onPress={ev => props.cancelSearch()}
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
        props.searchCallBack(newURL)
    }

    const RenderMagRange = () => {
        return (
            <React.Fragment>
                <Text style={styles.subTitleText}>Magnitude Range</Text>
                <Text style={styles.descriptionText}>Sift data by limiting minimum and maximum earthquake magnitude</Text>

                <Card style={{marginTop: 10}}>

                    {/* 这坨就这样吧分开写有问题反正也不会有人看到这坨代码吧哈哈 */}
                    <Grid style={{marginBottom:20}}>
                        <Col><Text style={styles.subTitleText}>{'Minimum Magnitude:'}</Text></Col>
                        <Col><Text style={{textAlign:'right'}}>{minMag} ML</Text></Col>
                    </Grid>
                        
                    <Slider
                        style={{width: '100%', height: 40}}
                        minimumValue={0}
                        maximumValue={12}
                        minimumTrackTintColor={androidGreen}
                        maximumTrackTintColor="#000000"
                        onValueChange={ev => handleChangeMinMag(ev)}
                        value={0}
                    /> 

                    <Grid style={{marginBottom:20}}>
                        <Col><Text style={styles.subTitleText}>{'Maximum Magnitude:'}</Text></Col>
                        <Col><Text style={{textAlign:'right'}}>{maxMag} ML</Text></Col>
                    </Grid>
                        
                    <Slider
                        style={{width: '100%', height: 40}}
                        minimumValue={0}
                        maximumValue={12}
                        minimumTrackTintColor={androidGreen}
                        maximumTrackTintColor="#000000"
                        onValueChange={ev => handleChangeMaxMag(ev)}
                        value={12}
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

    const RenderTimeDatePicker = (props) => {
        let { enabled } = props
        return (
            <> 
                <Text style={styles.subTitleText}>{props.title}</Text>
                <Text style={styles.descriptionText}>{props.subTitle}</Text>

                <Card style={{marginTop:10, marginBottom:30}}>
                    <View style={{height:120}}>
                        <Grid>
                            <Row>
                                <Col><Text style={{fontSize:15, fontWeight:'bold', color: enabled ? 'black' : 'gray'}}>{props.cardTitle}</Text></Col>
                                <Col>
                                    <Switch
                                        trackColor={{ false: "#c4c4c4", true: "#4ea381" }}
                                        thumbColor={androidGreen}
                                        onValueChange={props.onEnableChange}
                                        value={enabled}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col size={6}><Text style={{textAlign:'center', color:enabled ? 'black' : 'grey'}}>{moment(props.date).format('MMMM Do YYYY')}</Text></Col>
                                <Col size={1} />
                                <Col size={6}><Text style={{textAlign:'center', color:enabled ? 'black' : 'grey'}}>{moment(props.time).format('h:mm A')}</Text></Col>
                            </Row>

                            <Row>
                                <Col size={6}>
                                    <Button 
										disabled={!enabled} 
										title="Pick Date" 
										color={androidGreen}
										onPress={ev => props.showPicker('date', ev)}
									/>
                                </Col>
                                <Col size={1}/>
                                <Col size={6}>
									<Button 
										disabled={!enabled} 
										title="Pick Time" 
										color={androidGreen}
										onPress={ev => props.showPicker('time', ev)}
									/>
								</Col>
                            </Row>

                            {props.showDatePicker && (
                                <DateTimePicker
									testID="datePicker"
									value={props.date}
									mode='date'
									is24Hour={true}
									display="default"
									onChange={(ev, selectedTime) => props.onChange(ev, selectedTime, 'date')}
								/>
                            )}

							{props.showTimePicker && (
                                <DateTimePicker
									testID="timePicker"
									value={props.time}
									mode='time'
									is24Hour={false}
									display="default"
									onChange={(ev, selectedTime) => props.onChange(ev, selectedTime, 'time')}
								/>
                            )}
                        </Grid>
                    </View>
                </Card>
            </>
        )
    }

    const RenderStartTime = () => {
        return (
            <RenderTimeDatePicker 
                title={'Set Start Time'}
                subTitle={'You can sift earthquake data by setting start time'}
                enabled={enableStartTime}
                cardTitle={'Enable start time'}
                onEnableChange={handleChangeEnableStartTime}
                showPicker={showStartPicker}
                showDatePicker={showStartDatePicker}
                showTimePicker={showStartTimePicker}
                onChange={onChangeStartTime}
                date={startDate}
                time={startTime}
            />
        )
	}
	
	const RenderEndTime = () => {
		return (
            <>
                <RenderTimeDatePicker 
                    title={'Set End Time'}
                    subTitle={'You can sift earthquake data by setting end time'}
                    enabled={enableEndTime}
                    cardTitle={'Enable end time'}
                    onEnableChange={handleChangeEnableEndTime}
                    showPicker={showEndPicker}
                    showDatePicker={showEndDatePicker}
                    showTimePicker={showEndTimePicker}
                    onChange={onChangeEndTime}
                    date={endDate}
                    time={endTime}
                />
            </>
        )
	}

    return(
        <ScrollView>
            <TopNavigation
                accessoryLeft={BackAction}
                title='Search'
            />

            <Layout level='2' style={{height:'100%', padding:20, marginBottom:70}}>
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
