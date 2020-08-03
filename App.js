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
import { CardStyleInterpolators } from '@react-navigation/stack';

import BottomNavigation from './components/BottomNav'
import DetailScreen from './screens/Detail'

//redux
import { Provider } from "react-redux";
import store from './store'

const Stack = createStackNavigator();

const App = () => {

    return(
        <>
					<Provider store={store}>
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
														headerShown: false,
													}}
										>
												<Stack.Screen 
														name="Main" 
														component={BottomNavigation}
												/>
												<Stack.Screen 
														name="Detail" 
														component={DetailScreen} 
														options={{
																cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
																transitionSpec: {
																	open:animationConfig,
																	close:animationConfig
																}
															}}
												/>
										</Stack.Navigator>
								</NavigationContainer>
						</ApplicationProvider>
					</Provider>
					
        </>
    )
}

const animationConfig = {
	animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
}

export default App