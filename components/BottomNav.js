import React from 'react'
import { StyleSheet } from 'react-native';

//Ui Kitten
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
const { Navigator, Screen } = createBottomTabNavigator();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import HomeScreen from '../screens/Home'
import GraphScreen from '../screens/Graph'
import AboutScreen from '../screens/About'

//nav
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  bottomNavigation: {
    position:'absolute',
    bottom:0
  },
});

const HomeIcon = (props) => (
  <Icon {...props} name='home-outline'/>
);

const MapIcon = (props) => (
  <Icon {...props} name='map-outline'/>
);

const InfoIcon = (props) => (
  <Icon {...props} name='info-outline'/>
);

// const TabNavigator = () => (
//   <Navigator tabBar={props => <BottomTabBar {...props} />}>
//     <Screen name='HOME' component={HomeScreen}/>
//     <Screen name='GRAPH' component={GraphScreen}/>
//     <Screen name='ABOUT' component={AboutScreen}/>
//   </Navigator>
// );

export default BottomNav = () => {

  const [ index, setIndex ] = React.useState(0)
  const navigation = useNavigation()

  const onSelect = (index) => {
    switch(index) {
      case 0:
        navigation.navigate('Home')
    }
    console.log(index)
  }

  const BottomTabBar = ({ navigation, state }) => (

    <BottomNavigation
      selectedIndex={index}
      // onSelect={index => navigation.navigate(state.routeNames[index])}
      onSelect={index => onSelect(index)}
      style={styles.bottomNavigation}
      appearance='noIndicator'
    >
      <BottomNavigationTab title='HOME' icon={HomeIcon}/>
      <BottomNavigationTab title='GRAPH' icon={MapIcon}/>
      <BottomNavigationTab title='ABOUT' icon={InfoIcon}/>
    </BottomNavigation>
  );

  return (
    <NavigationContainer independent={true}>
      {/* <TabNavigator/> */}
      <BottomTabBar />
    </NavigationContainer>
  )

};