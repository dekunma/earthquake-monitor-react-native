import React from 'react'
import { View, Text } from 'react-native'
import { MapView, MapType } from "react-native-amap3d"
import axios from 'axios'

//ui kitten
import { Card, StyleService, useStyleSheet } from '@ui-kitten/components';

// grid
import { Row, Col, Grid } from "react-native-easy-grid";

export default About = () => {

    const currentTime = new Date()
    const endTime = currentTime.getFullYear() + '-' + eval(currentTime.getMonth() + 1) + '-' + currentTime.getDate() + '-' + currentTime.getHours() + '-' + currentTime.getMinutes()
    const yesterdayTime = new Date(currentTime)
    yesterdayTime.setDate(yesterdayTime.getDate() - 1)
    const startTime = yesterdayTime.getFullYear() + '-' + eval(yesterdayTime.getMonth() + 1) + '-' + yesterdayTime.getDate() + '-' + yesterdayTime.getHours() + '-' + yesterdayTime.getMinutes()
    const URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=100'

    const [ earthquakeCount, setEarthquakeCount ] = React.useState(0)
    const [ theMinMag, setTheMinMag ] = React.useState(0)
    const [ theMaxMag, setTheMaxMag] = React.useState(0)
    const [ theMaxDepth, setTheMaxDepth ] = React.useState(0)
    const [ theMaxAgo, setTheMaxAgo ] = React.useState(0)
    const [ averge, setAverge ] = React.useState(0)
    const [ placeArr, setPlaceArr ] = React.useState([])
    const [ earthquakeData, setEarthquakeData ] = React.useState([])
    const [ clickedPos, setClickedPos ] = React.useState('')


    React.useEffect(() => {
        let magSum = 0
        let newPlaceArr = []
        let minMag = 12
        let maxAgo = 0
        let maxMag = 0
        let maxDepth = 0
        axios.get(`${URL}&minmagnitude=4.5&starttime=${startTime}&endtime=${endTime}`)
        .then(r => {
            const data = r.data.features
            for (let ii = 0; ii < data.length; ii++) {
                const currentProperties = data[ii].properties
                const coordinates = data[ii].geometry.coordinates
                newPlaceArr.push({latitude: coordinates[1], longitude: coordinates[0]})
                magSum += currentProperties.mag
                if (currentProperties.mag < minMag) minMag = currentProperties.mag
                if (currentProperties.mag > maxMag) {
                    maxMag = currentProperties.mag
                    maxDepth = coordinates[2]
                    maxAgo = currentTime.getHours() - new Date(1609105154746).getHours()
                } 
            }
            setTheMaxMag(maxMag)
            setTheMinMag(minMag)
            setEarthquakeCount(data.length)
            setTheMaxAgo(maxAgo)
            setTheMaxDepth(maxDepth)
            setAverge((magSum / data.length).toFixed(1))
            setPlaceArr(newPlaceArr)
            setEarthquakeData(data)
        })
        
    }, [])

    const handleItemClick = (ev) => {
        const idx = placeArr.indexOf(ev)
        setClickedPos(earthquakeData[idx].properties.place)
    }

    const themedStyles = StyleService.create({
        card: {
            position:'absolute',
			bottom:65,
			backgroundColor:colors.yellow,
			marginLeft:15,
			width:'92%',
            zIndex:100,
            shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 3,
			},
			shadowOpacity: 0.5,
			shadowRadius: 4.65,
			
			elevation: 4,
        },
        upperLeftBigText: {
            color: 'white',
            fontSize: 30,
            fontWeight:'bold',
        },
        upperSmallText: {
            color: 'white',
            fontSize: 15
        },
        upperRightText: {
            color: 'white',
            fontSize: 15,
            textAlign: 'right'
        },
        totalEarthQuakeText: {
            color: 'white', 
            fontSize: 20,
            marginTop: 30
        },
        totalEarthQuakeNumber: {
            color: 'white', 
            fontWeight:'bold', 
            fontSize: 30
        },
        theLargestText: {
            color: 'white', 
            fontSize: 20,
            marginTop: 10
        },
        bottomNumLeft: {
            fontWeight: 'bold',
            fontSize: 30,
            color: 'white',
            textAlign: 'left'
        },
        bottomNumRight: {
            fontWeight: 'bold',
            fontSize: 30,
            color: 'white',
            textAlign: 'right'
        },
        bottomText: {
            color: 'white',
            fontSize: 15
        },
        placeTextContainer: {
            position: 'absolute',
            top:15,
            textAlign: 'center',
            zIndex: 100,
            width: '100%'
        },
        placeText: {
            color: colors.yellow,
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center'
        }
	})

	const styles = useStyleSheet(themedStyles);

    const RenderCard = () => {
		return(
			<>
				<Card appearance='filled' style={styles.card}>
                    <Grid>
                        <Row>
                            <Col >
                                <Grid>
                                    <Col>
                                        <Text style={styles.upperLeftBigText}>{averge}<Text style={styles.upperSmallText}>{` avg`}</Text></Text>
                                        
                                    </Col>

                                    <Col> 
                                        <Text style={styles.upperSmallText}>{theMaxMag} max</Text>
                                        <Text style={styles.upperSmallText}>{theMinMag} min</Text>
                                    </Col>
                                </Grid>
                            </Col>

                            <Col >
                                {/* placeholder */}
                            </Col>
                        </Row>

                        <Text style={styles.totalEarthQuakeText}>In the past 24 hours, there were <Text style={styles.totalEarthQuakeNumber}>{earthquakeCount}</Text> big earthquakes globally</Text>

                        <Text style={styles.theLargestText}>The biggest one:</Text>
                        <Row>
                            <Col> 
                                <Text style={styles.bottomNumLeft}>{theMaxMag} <Text style={styles.bottomText}>mag</Text></Text> 
                            </Col>
                            <Col> 
                                <Text style={styles.bottomNumLeft}>{theMaxDepth} <Text style={styles.bottomText}>km deep</Text></Text> 
                            </Col>
                            <Col> 
                                <Text style={styles.bottomNumRight}>{theMaxAgo} <Text style={styles.bottomText}>hours ago</Text> </Text> 
                            </Col>

                            {/* 为啥下面这种写法会crash掉整个program啊 */}
                            {/* <Col> <Text style={styles.bottomNumLeft}>{theMaxMag} <Text style={styles.bottomText}>mag</Text></Text> </Col>
                            <Col> <Text style={styles.bottomNumLeft}>{theMaxDepth} <Text style={styles.bottomText}>km deep</Text></Text> </Col>
                            <Col> <Text style={styles.bottomNumRight}>{theMaxAgo} <Text style={styles.bottomText}>hours ago</Text> </Text> </Col> */}
                        </Row>
                    </Grid>
				</Card>
			</>
		)
	}

    return(
        <>  
            <RenderCard />
            <View style={styles.placeTextContainer}>
                <Text style={styles.placeText}>{clickedPos}</Text>
            </View>
            
            <MapView
                locationEnabled
                mapType={MapType.Standard}
                showsZoomControls={false}
                style={{
                    width: '100%',
                    height: '100%',
                    marginBottom: -57
                }}
                mapLanguage={1}
                zoomLevel={1}
                tiltEnabled={false}
            >
                <MapView.MultiPoint
                    points={placeArr}
                    onItemPress={ev => handleItemClick(ev)}
                />
            </MapView>
        </>
    )
}

const colors = {
	yellow: '#fcca42'
}
