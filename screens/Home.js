import React from 'react'
import { ScrollView, RefreshControl, View, TouchableOpacity } from 'react-native'

//axios
import axios from 'axios'

//Ui Kitten
import { Text, TopNavigation, Icon, MenuItem, OverflowMenu, TopNavigationAction, Layout } from '@ui-kitten/components';

//screens & components
import CardForHome from '../components/CardForHome'
import Loading from '../screens/Loading'
import SearchScreen from '../screens/Search'
import DetailScreen from '../screens/Detail'


import { Toast } from 'popup-ui'

//cache
import { Cache } from "react-native-cache";
import AsyncStorage from '@react-native-community/async-storage';

//react-navigation
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
const Stack = createStackNavigator();

//redux
import { useSelector } from 'react-redux'

// popup
import Modal from 'react-native-modal';

const SearchIcon = (props) => (
	<Icon {...props} name='search-outline' />
)

// export default HomeContainer = () => {
// 	return (
// 		<React.Fragment>
// 			<NavigationContainer independent={true}>
// 				<Stack.Navigator 
// 					initialRouteName="Home" 
// 					screenOptions={{
// 						headerShown: false,
// 					}}
// 				>
// 				<Stack.Screen 
// 						name="Home" 
// 						component={Home}
// 				/>
// 				<Stack.Screen 
// 					name="Search" 
// 					component={SearchScreen} 
// 					options={{
// 						cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
// 						gestureEnabled:true,
// 						gestureDirection:'vertical',
// 						transitionSpec: {
// 							open:animationConfig,
// 							close:animationConfig
// 						}
// 					}}
// 				/>
// 					</Stack.Navigator>
// 			</NavigationContainer>
// 		</React.Fragment>
// 	)
// }


export default Home = (props) => {

  const [ data, setData ] = React.useState([])
	const [ loading, setLoading ] = React.useState(true)
	const [ menuVisible, setMenuVisible ] = React.useState(false)
	const [ refreshing, setRefreshing ] = React.useState(false)
	// const [ refreshTriggerer, setRefreshTriggerer ] = React.useState(0)
	const [ searchVisible, setSearchVisible ] = React.useState(false)

	const navigation = useNavigation();

	// const URL = useSelector(state => state.URL)
	const URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=100'
	const triggerRefresh = useSelector(state => state.triggerRefresh)

	const onRefresh = React.useCallback((url) => {
		let alerter = setTimeout(() => {
			Toast.show({
				title: 'Timed Out',
				text: 'Unable to fetch data after 30 seconds',
				type: 'Warning',
				color: '#f39c12',
			})
			setRefreshing(false)
			setLoading(false)
		}, 30000)

		setRefreshing(true);

		axios.get(url)
		.then(r => {
			const data = r.data.features
			setData(data)
			setRefreshing(false)
			Toast.show({
				title: 'Success',
				text: 'Information Updated',
				type: 'Warning',
				color: '#2ecc71',
			})
		})
		.catch(e => {
			Toast.show({
				title: 'Error',
				text: e.message,
				type: 'Warning',
				color: '#f39c12',
			})
			setRefreshing(false)
		})
		.finally(f => {
			clearTimeout(alerter)
		})

	}, []);	

	// const toggleMenu = () => {
	// 	setMenuVisible(!menuVisible);
	// };

	// const navigateToSearch = () => {
	// 	navigation.setOptions({
	// 		onRefresh: () => onRefresh()
	// 	})
	// 	navigation.push('Search')
	// }
	
	const renderMenuAction = () => (
		<TopNavigationAction icon={SearchIcon} onPress={toggleSearch}/>
	);
	
	const renderRightActions = () => (
		<React.Fragment>
			<OverflowMenu
				anchor={renderMenuAction}
				visible={menuVisible}
			>
			</OverflowMenu>
		</React.Fragment>
	);

	const getData = () => {
		axios.get(URL)
		.then(r => {
			const data = r.data.features
			setData(data)
			setLoading(false)
			cache.set("data", data);
		})
		.catch(e => {
			Toast.show({
				title: 'Error',
				text: e.message,
				type: 'Warning',
				color: '#f39c12',
			})
			setRefreshing(false)
			setLoading(false)
		})
	}

	const toggleSearch = () => {
		setSearchVisible(!searchVisible)
	}

	const searchCallBack = (newURL) => {
		toggleSearch()
		onRefresh(newURL)
	}

	React.useEffect(() => {
		// const unsubscribe = navigation.addListener('focus', () => {
		// 	// setRefreshTriggerer(count => count + 1) //我真的qtmd，必须得这样，不然redux的state不会被更新
		// 	// console.log('r', props.route)
		// 	// if(props.route.params && props.route.params.triggerRefresh) console.log(11111111)
		// 	console.log(1111, props.route.params)
		// })

		const cacheData = cache.get("data")
		setTimeout(() => {
			if(cacheData === null || cacheData._W === undefined || cacheData._W === null) {
				getData()
			}
			else {
				setData(cacheData._W)
				setLoading(false)
				getData()
			}
		}, 100)
		// return unsubscribe
	}, [])

    return(
			<Layout style={{height:'100%'}} level='2'>
				<TopNavigation
					alignment='center'
					title='Earthquake Information'
					accessoryRight={renderRightActions}
				/>

				<Modal 
					isVisible={searchVisible}
					onBackButtonPress={ev => toggleSearch()}
					style={{margin: 0}}
					useNativeDriver={true}
				>
					<View >
						<SearchScreen 
							searchCallBack={searchCallBack}
						/>
					</View>
				</Modal>

					<ScrollView 
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={ev => onRefresh(URL)} />
						}
						style={{height:'100%'}}
					>
						<Layout style={{height:'100%'}} level='2'>
							{loading
								? <Loading />
								: 
								data.map(elem => {
									const mag = elem.properties.mag
									var sig = elem.properties.sig
									var color
									if(mag < 1) {
										color = colors.grey
									}
									else if(mag < 3) {
										color = colors.green
									}
									else if(mag < 5) {
										color = colors.blue
									}
									else if(mag < 6) {
										color = colors.purple
									}
									else if(mag < 7) {
										color = colors.yellow
									}
									else color = colors.orange
									
									sig /= 10

									return(
										<CardForHome 
											key={elem.properties.ids}
											place={elem.properties.title}
											mag={elem.properties.mag}
											color={color}
											time={elem.properties.time}
											type={elem.properties.type}
											alert={elem.properties.alert}
											status={elem.properties.status}
											sig={sig}
											details={elem.properties}
											geometry={elem.geometry}
										/>
									)
									
								})
							}
						</Layout>
						
					</ScrollView>
				</Layout>
    )
}

const colors = {
	grey: '#8E8E92',
	green: '#65C466',
	blue: '#3478F6',
	purple: '#5756CE',
	yellow: '#F7CE45',
	orange: '#EC6751'
}

const cache = new Cache({
    namespace: "earthquakeApp",
    policy: {
        maxEntries: 5000
    },
    backend: AsyncStorage
});

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