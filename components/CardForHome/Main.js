import React from 'react'
import { View } from 'react-native'

//navigator
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import CardForHome from '../CardForHome'
import DetailScreen from '../../screens/Detail'

const Stack = createStackNavigator();

function Test (){
    return(<View></View>)
}

export default Main = (props) => {
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Detail">
                <Stack.Screen name="CardForHome" children={() => CardForHome}/>
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}