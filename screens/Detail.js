import React from 'react'

import { Text } from '@ui-kitten/components'
import { useSelector } from 'react-redux'

export default Detail = (props) => {

    const place = useSelector(state => state.place)

    React.useEffect(() => {
        console.log(place)
    }, [])

    return(
        <Text>route.params.place</Text>
    ) 
}