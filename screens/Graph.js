import React from 'react'
import { Text, View } from 'react-native'
import { MapView, MapType } from "react-native-amap3d";

export default About = () => {
    return(
        <React.Fragment>
            <View>
                <MapView
                    locationEnabled
                    // coordinate={{
                    //     latitude: 39.91095,
                    //     longitude: 116.37296
                    // }}
                    mapType={MapType.Satellite}
                    showsZoomControls={false}
                    style={{
                        width: '100%',
                        height: '100%',
                        marginBottom: -57
                    }}
                    mapLanguage={1}
                    zoomLevel={1}
                    tiltEnabled={false}
                />
            </View>
             
        </React.Fragment>
    )
}