import React from 'react'
import { Image } from 'react-native'

//ui kitten
import { Icon, Text, TopNavigation, TopNavigationAction, Card, StyleService, useStyleSheet } from '@ui-kitten/components';

//custom components
import PinImage from '../images/pin.png'

//redux
import { useSelector } from 'react-redux'

//map
import { MapView, MapType } from "react-native-amap3d";

import moment from 'moment'

// grid
import { Col, Grid } from "react-native-easy-grid";

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline'/>
);

export default Detail = (props) => {

    const details = useSelector(state => state.details)
	const geometry = useSelector(state => state.geometry)
	const color = useSelector(state => state.color)
	
	const [ lat, setLat ] = React.useState(0)
	const [ long, setLong ] = React.useState(0)
	const [ depth, setDepth ] = React.useState(0)

	const themedStyles = StyleService.create({
		header: {
			position:'absolute',
			bottom:222,
			backgroundColor:color,
			borderBottomEndRadius: 0,
			borderBottomStartRadius: 0,
			marginLeft:15,
			width:'92%',
			zIndex:100,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 3,
			},
			shadowOpacity: 0.27,
			shadowRadius: 4.65,
			
			elevation: 6,
		},
		title:{
			color:'white',
			fontSize:13
		},
		body: {
			position:'absolute',
			bottom:68,
			borderRadius:0 ,
			backgroundColor:color,
			marginLeft:15,
			width:'92%',
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
		bodyTitle: {
			color:'white',
			fontSize: 18,
			fontWeight:'bold'
		},
		bodySub: {
			color:'white',
			fontSize: 15,
		},
		footer: {
			position:'absolute',
			bottom:20,
			borderTopEndRadius:0,
			borderTopStartRadius:0,
			backgroundColor:'white',
			marginLeft:15,
			width:'92%',
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
		footerText: {
			fontSize:13
		},
		statusText: {
			textAlign: 'right',
			color: 'rgba(255,255,255,0.4)',
			fontWeight: 'bold'
		}
	})

	const styles = useStyleSheet(themedStyles);

	React.useEffect(() => {
		setLat(geometry.coordinates[1])
		setLong(geometry.coordinates[0])
		setDepth(geometry.coordinates[2])
	}, [])

	const BackAction = () => (
		<TopNavigationAction 
			icon={BackIcon}
			onPress={ev => props.navigation.goBack()}
		/>
	);

	const RenderCard = () => {
		return(
			<React.Fragment>
				<Card appearance='filled' style={styles.header}>
					<Text style={styles.title}>{details.title}</Text>
				</Card>

				<Card appearance='filled' style={styles.body}>
					<Text style={styles.bodyTitle}>{details.sig > 600 ? '⚠ Dangerous':'No Danger'}</Text> 
					<Text style={styles.bodySub}>Based on earthquake data, we determined that {details.sig > 600 ? 'the earthquake may cause facilities damage and casualities.':'no serious damage might occur.'}</Text> 
					<Text style={styles.bodySub}>Depth: {depth.toFixed(3)} km</Text> 
					<Text style={styles.bodySub}>Maximum Intensity: {details.mmi === null ? 0 : details.mmi} Gal</Text> 

					<Grid>
						<Col size={5}><Text style={styles.bodySub}>Coordinates: ({lat.toFixed(3)}, {long.toFixed(3)})</Text></Col>
						<Col size={2} ><Text style={styles.statusText}>{details.status.toUpperCase()}</Text></Col>
					</Grid>
					
				</Card>

				<Card appearance='filled' style={styles.footer}>
					<Text style={styles.footerText}>Updated At {moment(details.updated).format('MMMM Do YYYY, h:mm:ss a')}</Text>
				</Card>
			</React.Fragment>
		)
	}

    return(
        <>
			<TopNavigation
				accessoryLeft={BackAction}
				title='Back to Info'
			/>
			{RenderCard()}
			<MapView
				center={{ 
					latitude: lat,
					longitude: long
				}}
				style={{
					width: '100%',
					height: '100%',
				}}
				mapType={MapType.Satellite}
				mapLanguage={1}
				tiltEnabled={false}
				zoomLevel={7}
				showsZoomControls={false}
			>
				<MapView.Marker
					coordinate={{
						latitude: lat - 0.16, //好了好了这部分是hard code, 不然Marker不在Circle中心
						longitude: long
					}}
					icon={() => <Image source={PinImage} style={{width:60, height:60}}/>}
				>
					<Text style={{color:'white', fontWeight: 'bold'}}>{details.place}</Text>
				</MapView.Marker>

				<MapView.Circle
					strokeWidth={12}
					strokeColor="rgba(255, 0, 0, 0.4)"
					fillColor="rgba(255, 0, 0, 0.2)"
					radius={40000}
					coordinate={{
						latitude: lat,
						longitude: long
					}}
				/>
			</MapView>
        </>
    ) 
}