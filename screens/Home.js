import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'

//axios
import axios from 'axios'

//Ui Kitten
import { Text, TopNavigation, Icon, MenuItem, OverflowMenu, TopNavigationAction, Layout } from '@ui-kitten/components';

//screens
import CardForHome from '../components/CardForHome'

//cache
import { Cache } from "react-native-cache";
import AsyncStorage from '@react-native-community/async-storage';

const SearchIcon = (props) => (
	<Icon {...props} name='search-outline' />
)

export default About = () => {

    const [ data, setData ] = React.useState([])
		const [ loading, setLoading ] = React.useState(true)
		const [ menuVisible, setMenuVisible ] = React.useState(false);

		const [ refreshing, setRefreshing ] = React.useState(false);

		const onRefresh = React.useCallback(() => {
			setRefreshing(true);

			axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=100&orderby=time&minmagnitude=0.0&maxmagnitude=12.0&starttime=2020-07-10')
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
		
		const renderMenuAction = () => (
			<TopNavigationAction icon={SearchIcon} onPress={toggleMenu}/>
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
			axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=100&orderby=time&minmagnitude=0.0&maxmagnitude=12.0&starttime=2020-07-11')
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
			}, 10)

			
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
										? <Text>loading</Text>
										:
										data.map(elem => {
											const mag = elem.properties.mag
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