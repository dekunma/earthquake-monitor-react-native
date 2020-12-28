import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'

//axios
import axios from 'axios'

//Ui Kitten
import { TopNavigation, Icon, TopNavigationAction, Layout } from '@ui-kitten/components';

//screens & components
import CardForHome from '../components/CardForHome'
import Loading from '../screens/Loading'
import SearchScreen from '../screens/Search'

//cache
import { Cache } from "react-native-cache";
import AsyncStorage from '@react-native-community/async-storage';

// popup
import Modal from 'react-native-modal';
import { Toast, Popup } from 'popup-ui'

// navigation
import { useNavigation } from '@react-navigation/native';

const SearchIcon = (props) => (
	<Icon {...props} name='search-outline' />
)

export default Home = (props) => {

  	const [ data, setData ] = React.useState([])
	const [ loading, setLoading ] = React.useState(true)
	const [ refreshing, setRefreshing ] = React.useState(false)
	const [ searchVisible, setSearchVisible ] = React.useState(false)

	const navigation = useNavigation()

	const URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=100'

	const getData = (url, silence=false) => {
		let alerter = setTimeout(() => {
			Toast.show({
				title: 'Timed Out',
				text: 'Unable to fetch data after 30 seconds',
				color: colors.warning,
			})
			setRefreshing(false)
			setLoading(false)
		}, 30000)

		if(!silence) setRefreshing(true);

		axios.get(url)
		.then(r => {
			const data = r.data.features

			// if no matched data
			if (data.length === 0) {
				Popup.show({
					type: 'Warning',
					title: 'Error.', // 这个插件会截去最后一个字符，所以多加一个点
					button: true,
					textBody: 'Your search does not return any data',
					buttonText: 'OK.',
					callback: () => {
						Popup.hide()
					}
				  })
				  setRefreshing(false)
				return
			}

			setData(data)
			setLoading(false)
			setRefreshing(false)
			if (data.length !== 0 && !silence) {
				Toast.show({
					title: 'Success',
					text: 'Data updated',
					color: colors.success,
				})
			}
			cache.set("data", data);
		})
		.catch(e => {
			Toast.show({
				title: 'Error',
				text: e.message,
				color: colors.orange,
			})
			
			setRefreshing(false)
			setLoading(false)
		})
		.finally(() => clearTimeout(alerter))
	}
	
	const renderRightActions = () => (
		<TopNavigationAction icon={SearchIcon} onPress={() => { navigation.push('Search', { getDataCallBack: getData })}} />
	);

	const toggleSearch = () => {
		setSearchVisible(!searchVisible)
	}

	const searchCallBack = (newURL) => {
		toggleSearch()
		getData(newURL)
	}

	React.useEffect(() => {
		console.log(props)
		const cacheData = cache.get("data")
		setTimeout(() => {
			if(cacheData === null || cacheData._W === undefined || cacheData._W === null) {
				getData(URL)
			}
			else {
				setData(cacheData._W)
				setLoading(false)
				
				// fetch data silencly (without loading and refreshing animation)
				getData(URL, true)
			}
		}, 100)
	}, [])

	const PopupSearch = () => {
		return (
			<Modal 
				isVisible={searchVisible}
				onBackButtonPress={ev => toggleSearch()}
				style={{margin: 0}}
				useNativeDriver={true}
			>
				<SearchScreen 
					searchCallBack={searchCallBack}
					cancelSearch={toggleSearch}
				/>
			</Modal>
		)
	}

	const InfoCards = () => {
		return data.map(elem => {
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

    return(
			<Layout style={{height:'100%'}} level='2'>
				<TopNavigation
					alignment='center'
					title='Earthquake Information'
					accessoryRight={renderRightActions}
				/>

				{/* Search Screen */}
				<PopupSearch />

				{/* Cards of earthequake information */}
				<ScrollView 
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={ev => getData(URL)} />
					}
					style={{height:'100%'}}
				>	
					<Layout style={{height:'100%'}} level='2'>
						{loading
							? <Loading />
							: <InfoCards />
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
	orange: '#EC6751',
	warning: '#f39c12',
	success: '#2ecc71'
}

const cache = new Cache({
    namespace: "earthquakeApp",
    policy: {
        maxEntries: 5000
    },
    backend: AsyncStorage
});