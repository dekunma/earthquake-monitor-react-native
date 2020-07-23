import React from 'react'
import { ScrollView, View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default Loading = () => {

    const [ skeletons, setSkeletons ] = React.useState([])

    React.useEffect(() => {
        var skeletons = []
        for(var ii = 0; ii < 50; ii++) skeletons.push(ii)

        setSkeletons(skeletons)

    }, [])

    return(
        <SkeletonPlaceholder speed={1500}>
            <ScrollView style={{ alignItems:'center' }}>
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

