import React from 'react'

//ui kitten
import { Card, Text, Layout, StyleService, useStyleSheet  } from '@ui-kitten/components'
import * as Progress from 'react-native-progress';
import { Col, Row, Grid } from "react-native-easy-grid";

//navigator
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import moment from 'moment'

import { useDispatch } from 'react-redux'
import testChangePlace from '../actions/testChangePlace'

const Stack = createStackNavigator();

export default CardForHome = (props) => {

	const dispatch = useDispatch()
	
	const themedStyles = StyleService.create({
		layout: {
			marginLeft: 20,
			marginRight: 20,
			marginTop: 15,
			backgroundColor: 'rgba(0,0,0,0)',
			paddingTop:0,
			
		},
		cardContainer: {
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 5,
			},
			shadowOpacity: 0.36,
			shadowRadius: 6.68,

			elevation: 11,
		},
		header: {
			marginTop:15,
			backgroundColor:props.color,
			borderBottomEndRadius: 0,
			borderBottomStartRadius: 0,
			zIndex:99,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 3,
			},
			shadowOpacity: 0.27,
			shadowRadius: 4.65,
			
			elevation: 6,
		},
		card: {
			borderTopEndRadius:0,
			borderTopStartRadius:0,
			zIndex:99,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 0,
			},
			shadowOpacity: 0.27,
			shadowRadius: 4.65,
			
			elevation: 6,
		},
		title: {
			color:'white',
			fontSize:23,
			fontWeight:'bold'
		},
		place: {
			color:'white',
			fontSize: 14
		},
		time: {
			color:'white',
			fontSize:14,
			opacity: 0.6
		},
		text: {
			fontSize:15,
		},
		barText: {
			fontSize:12,
			opacity: 0.7
		},
		barTextContainer: {
			marginTop:7,
			marginBottom:7
		},
		rightMainText: {
			color:props.color,
			fontSize: 25,
			fontWeight:'bold'
		},
		rightSubText: {
			color: props.color,
			fontSize: 13,
			marginTop:12,
			marginLeft:2
		}
	})

	const styles = useStyleSheet(themedStyles);
	const navigation = useNavigation();

	return(
			<React.Fragment>
				<Layout style={styles.layout}>

					<Card appearance='filled' style={styles.header} onPress={() => navigation.navigate('Detail')}>
						<Text style={styles.title}>Magnitude · {props.mag.toFixed(1)}</Text>
						<Text style={styles.place}>{props.place}</Text>
						<Text style={styles.time}>{moment(props.time).format('MMMM Do YYYY, h:mm:ss a')}</Text>
					</Card>

					<Card 
						appearance='filled' 
						style={styles.card}
						onPress={() => {
							navigation.push('Detail')
							dispatch(testChangePlace(props.place))
						}}
					>
						<Grid>
							<Col>
								<Text style={styles.text}>Type: {props.type}</Text>
								<Text style={styles.text}>Alert: {props.alert === null ? 'none' : props.alert}</Text>
								<Text style={styles.text}>Status: {props.status}</Text>
							</Col>
							<Col >
								<Layout style={{flexDirection:'row', marginTop:13}}>
									<Text style={styles.rightMainText}>0</Text>
									<Text style={styles.rightSubText}>Intensity (lv 0, no feeling)</Text>
								</Layout>
								
								
							</Col>
						</Grid>
						
						<Grid style={styles.barTextContainer}>
							<Col><Text style={styles.barText}>Tiny</Text></Col>
							<Col><Text style={styles.barText}>Small</Text></Col>
							<Col><Text style={styles.barText}>Medium</Text></Col>
							<Col><Text style={{textAlign:'center', fontSize:12, opacity: 0.7}}>Strong</Text></Col>
							<Col><Text style={{textAlign:'right', fontSize:12, opacity: 0.7}}>Mega</Text></Col>
						</Grid>
						<Progress.Bar 
							progress={props.mag / 10} 
							width={null} 
							height={2}
							borderColor={'white'}
							color={props.color}
							unfilledColor={'#D9D9DE'}
						/>
					</Card>

				</Layout>	
			</React.Fragment>
			
				
	) 
}



