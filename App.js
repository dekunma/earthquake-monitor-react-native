import React from 'react'

//ui kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
// import { default as mapping } from './themeMapping.json'

//navigator
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigation from './components/BottomNav'
import DetailScreen from './screens/Detail'

const Stack = createStackNavigator();

const App = () => {

    return(
        <>
            
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider 
                    {...eva} 
                    theme={eva.light}
                    // customMapping={mapping}
                >
                    <NavigationContainer>
                        <Stack.Navigator 
                            initialRouteName="Main" 
                            screenOptions={{
                                headerShown: false
                              }}
                        >
                            <Stack.Screen name="Main" component={BottomNavigation}/>
                            <Stack.Screen name="Detail" component={DetailScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ApplicationProvider>
        </>
    )
}

export default App