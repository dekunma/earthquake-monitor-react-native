import React from 'react'
import { Text, Image, View } from 'react-native'

// utils
import appInfo from '../package.json'
import LogoImage from '../images/earthquake_logo.png'

//ui kitten
import { StyleService, useStyleSheet, Layout } from '@ui-kitten/components';

// configure color scheme
import { useColorScheme } from 'react-native-appearance';

export default About = () => {

    const colorScheme = useColorScheme();

    const themedStyles = StyleService.create({
        headerLight: {
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
            marginBottom: 10,
        },
        headerDark: {
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
            marginBottom: 10,
            color: 'white'
        },
        normalTextLight: {
            fontSize: 17,
            textAlign: 'center',
            color: 'rgba(0,0,0,0.6)',
            marginBottom: 10,
        },
        normalTextDark: {
            fontSize: 17,
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 10,
        },
        longTextLight: {
            fontSize: 17,
            textAlign: 'justify',
            color: 'rgba(0,0,0,0.6)',
            marginBottom: 10,
        },   
        longTextDark: {
            fontSize: 17,
            textAlign: 'justify',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 10,
        },                 
        subHeaderLight: {
            fontWeight: 'bold',
            fontSize: 17,
            textAlign: 'center',
            marginBottom: 10,
            color: 'rgba(0,0,0,0.6)'
        },
        subHeaderDark: {
            fontWeight: 'bold',
            fontSize: 17,
            textAlign: 'center',
            marginBottom: 10,
            color: 'rgba(255,255,255,0.6)'
        },
    })

    const styles = useStyleSheet(themedStyles);

    return(
        <Layout level='2' style={{height:'100%', paddingLeft:40, paddingRight: 40}}>
            <View style={{alignItems:'center', justifyContent:'center', margin: 30}}>
                <Image source={LogoImage} style={{width:90, height:90, borderRadius: 5}}/>
            </View>
            
            <Text style={colorScheme === 'light' ? styles.headerLight : styles.headerDark}>Earthquake Monitor</Text>
            <Text style={colorScheme === 'light' ? styles.normalTextLight : styles.normalTextDark}>Get earthquake information in time</Text>
            <Text style={colorScheme === 'light' ? styles.normalTextLight : styles.normalTextDark}>VER {appInfo.version}</Text>
            <Text style={colorScheme === 'light' ? styles.longTextLight : styles.longTextDark}>If you encountered any unsolvable problem (or bug) when using our app, please contact us with the following information. We will contact you as soon as possible.</Text>
            
            <Text style={colorScheme === 'light' ? styles.normalTextLight : styles.normalTextDark}>Email: William@dekun.me</Text>
            <Text style={colorScheme === 'light' ? styles.normalTextLight : styles.normalTextDark}>WeChat: Magnoliae_Flos </Text>

            <Text style={colorScheme === 'light' ? styles.subHeaderLight : styles.subHeaderDark}>UI</Text>
            <Text style={colorScheme === 'light' ? styles.normalTextLight : styles.normalTextDark}>威廉母马</Text>
            <Text style={colorScheme === 'light' ? styles.subHeaderLight : styles.subHeaderDark}>Icons</Text>
            <Text style={colorScheme === 'light' ? styles.normalTextLight : styles.normalTextDark}>老腊肉</Text>
            <Text style={colorScheme === 'light' ? styles.subHeaderLight : styles.subHeaderDark}>Development</Text>
            <Text style={colorScheme === 'light' ? styles.normalTextLight : styles.normalTextDark}>威廉母马</Text>
            <Text style={colorScheme === 'light' ? styles.subHeaderLight : styles.subHeaderDark}>Support</Text>
            <Text style={colorScheme === 'light' ? styles.normalTextLight : styles.normalTextDark}>老腊肉</Text>
            {/* 在这儿放个女朋友的名字应该也没人会注意到吧嘻嘻 */}
            <Text style={colorScheme === 'light' ? styles.normalTextLight : styles.normalTextDark}>Vivian</Text>
        </Layout>
    )
}