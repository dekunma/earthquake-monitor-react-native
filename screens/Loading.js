import React from 'react'
import { ScrollView, View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

// configure color scheme
import { useColorScheme } from 'react-native-appearance';

export default Loading = () => {

    const [ skeletons, setSkeletons ] = React.useState([])

    const colorScheme = useColorScheme()

    React.useEffect(() => {
        var skeletons = []
        for(var ii = 0; ii < 50; ii++) skeletons.push(ii)

        setSkeletons(skeletons)

    }, [])

    return(
        <SkeletonPlaceholder speed={1500} backgroundColor={colorScheme === 'dark' ? '#212b46' : '#E1E9EE'} highlightColor={colorScheme === 'dark' ? '#2d3a5e' : '#F2F8FC'}>
            <ScrollView style={{ alignItems:'center'}}>
                {skeletons.map(elem => (
                    <View 
                        key= {elem} 
                        style={{ 
                            width: 380, 
                            height: 220, 
                            marginTop:27,
                            borderRadius: 7
                        }} 
                    />
                ))}
            </ScrollView>
        </SkeletonPlaceholder>
    )
}

