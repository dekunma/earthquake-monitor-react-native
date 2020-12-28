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

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
    style={styles.bottomNavigation}
    appearance='noIndicator'
  >
    <BottomNavigationTab title='HOME' icon={HomeIcon}/>
    <BottomNavigationTab title='GRAPH' icon={MapIcon}/>
    <BottomNavigationTab title='ABOUT' icon={InfoIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='HOME' component={HomeScreen}/>
    <Screen name='GRAPH' component={GraphScreen}/>
    <Screen name='ABOUT' component={AboutScreen}/>
  </Navigator>
);

export default BottomNav = () => (
  
  <NavigationContainer independent={true}>
    <TabNavigator/>
  </NavigationContainer>
  
);