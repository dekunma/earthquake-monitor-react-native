import React from 'react'
import { StatusBar } from 'react-native'

//ui kitten
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

//navigator
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import BottomNavigation from './components/BottomNav'
import DetailScreen from './screens/Detail'
import HomeScreen from './screens/Home'
import SearchScreen from './screens/Search'

//redux
import { Provider } from "react-redux";
import store from './store'

// pop up
import { Root } from 'popup-ui'

// configure color scheme
import { Appearance, useColorScheme } from 'react-native-appearance';

// splash screen
import SplashScreen from 'react-native-splash-screen'

// configure navBar color
import NavigationBar from 'react-native-navbar-color'

/**
 * Get the current color scheme
 */
Appearance.getColorScheme();

const Stack = createStackNavigator();

const App = () => {

	const colorScheme = useColorScheme()
	const barColor = colorScheme === 'light' ? 'white' : '#212b46'
	const barStyle = colorScheme == 'light' ? 'dark-content' : 'light-content'


	React.useEffect(() => {
		SplashScreen.hide()
		NavigationBar.setColor(barColor)
	}, [])

    return(
		<Provider store={store}>
			<StatusBar backgroundColor={barColor} barStyle={barStyle}/>
			<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider 
					{...eva} 
					theme={colorScheme === 'light' ? eva.light : eva.dark}
				>
					{/* Root for Toast (bottom pop up) */}
					<Root>
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
									name="Home" 
									component={HomeScreen}
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
								<Stack.Screen 
									name="Search" 
									component={SearchScreen} 
									options={{
										cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
										gestureEnabled:true,
										gestureDirection:'vertical',
										transitionSpec: {
											open:animationConfig,
											close:animationConfig
										}
									}}
								/>
							</Stack.Navigator>
						</NavigationContainer>
					</Root>
			</ApplicationProvider>
		</Provider>
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