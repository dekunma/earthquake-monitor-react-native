import React from 'react'

//ui kitten
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

//custom components

//redux
import { useSelector } from 'react-redux'

//map
import { MapView } from "react-native-amap3d";

const DownIcon = (props) => (
    <Icon {...props} name='arrow-downward-outline'/>
);

export default Detail = (props) => {

		const BackAction = () => (
			<TopNavigationAction 
				icon={DownIcon}
				onPress={ev => props.navigation.goBack()}
			/>
	);

    const details = useSelector(state => state.details)
    const geometry = useSelector(state => state.geometry)

    React.useEffect(() => {
				console.log(details.place)
				console.log(geometry.coordinates[0])
    }, [])

    return(
        <React.Fragment>
          <TopNavigation
          	accessoryLeft={BackAction}
            title='Details'
          />
          <MapView
							center={{ latitude: geometry.coordinates[1], longitude: geometry.coordinates[0] }}
              style={{
                  width: '100%',
                  height: '100%',
                  // marginBottom: -100
              }}
              mapLanguage={1}
							tiltEnabled={false}
							zoomLevel={6}
          >
						<MapView.Marker
							coordinate={{
								latitude: geometry.coordinates[1],
								longitude: geometry.coordinates[0]
							}}
						>
							<Text>test</Text>
						</MapView.Marker>
					</MapView>
        </React.Fragment>
    ) 
}