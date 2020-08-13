import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'

//axios
import axios from 'axios'

//Ui Kitten
import { Text, TopNavigation, Icon, MenuItem, OverflowMenu, TopNavigationAction, Layout } from '@ui-kitten/components';

//screens & components
import CardForHome from '../components/CardForHome'
import Loading from '../screens/Loading'
import SearchScreen from '../screens/Search'

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
import handleTriggerRefresh from '../actions/handleTriggerRefresh'

const SearchIcon = (props) => (
	<Icon {...props} name='search-outline' />
)

const ORIGINAL_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=100'

export default HomeContainer = () => {
	return (
		<React.Fragment>
			<NavigationContainer independent={true}>
					<Stack.Navigator 
						initialRouteName="Home" 
						screenOptions={{
								headerShown: false,
							}}
					>
							<Stack.Screen 
									name="Home" 
									component={Home}
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
		</React.Fragment>
		
	)
}


const Home = (props) => {

  const [ data, setData ] = React.useState([])
	const [ loading, setLoading ] = React.useState(true)
	const [ menuVisible, setMenuVisible ] = React.useState(false)
	const [ refreshing, setRefreshing ] = React.useState(false)

	const navigation = useNavigation();

	const URL = useSelector(state => state.URL)
	const triggerRefresh = useSelector(state => state.triggerRefresh)

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		axios.get(URL)
		.then(r => {
				const data = r.data.features
				setData(data)
				setRefreshing(false)
		})
		.catch(e => {
				console.log(e)
		})
	}, []);	

	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	const navigateToSearch = () => {
		navigation.push('Search')
	}
	
	const renderMenuAction = () => (
		<TopNavigationAction icon={SearchIcon} onPress={navigateToSearch}/>
	);
	
	const renderRightActions = () => (
		<React.Fragment>
			<OverflowMenu
				anchor={renderMenuAction}
				visible={menuVisible}
				onBackdropPress={toggleMenu}>
				<MenuItem title='About'/>
				<MenuItem title='Logout'/>
			<MenuItem title='Test' children={ev => <Text>test</Text>}/>
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
				console.log('error',e)
				setLoading(false)
		})
	}

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log(111, URL)
			console.log('p', props.route)
		})

		const blurTest = navigation.addListener('blur', () => {
			console.log(222, URL)
		})

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

							<ScrollView 
								refreshControl={
									<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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