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

    const lightStyles = StyleService.create({
        header: {
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
            marginBottom: 10,
        },
        normalText: {
            fontSize: 17,
            textAlign: 'center',
            color: 'rgba(0,0,0,0.6)',
            marginBottom: 10,
        },
        longText: {
            fontSize: 17,
            textAlign: 'justify',
            color: 'rgba(0,0,0,0.6)',
            marginBottom: 10,
        },                 
        subHeader: {
            fontWeight: 'bold',
            fontSize: 17,
            textAlign: 'center',
            marginBottom: 10,
            color: 'rgba(0,0,0,0.6)'
        },
    })

    const darkStyles = StyleService.create({
        header: {
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
            marginBottom: 10,
            color: 'white'
        },
        normalText: {
            fontSize: 17,
            textAlign: 'center',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 10,
        }, 
        longText: {
            fontSize: 17,
            textAlign: 'justify',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 10,
        },                 
        subHeader: {
            fontWeight: 'bold',
            fontSize: 17,
            textAlign: 'center',
            marginBottom: 10,
            color: 'rgba(255,255,255,0.6)'
        },
    })

    const styles = colorScheme === 'light' ? useStyleSheet(lightStyles) : useStyleSheet(darkStyles);

    return(
        <Layout level='2' style={{height:'100%', paddingLeft:40, paddingRight: 40}}>
            <View style={{alignItems:'center', justifyContent:'center', margin: 30}}>
                <Image source={LogoImage} style={{width:90, height:90, borderRadius: 5}}/>
            </View>
            
            <Text style={styles.header}>Earthquake Monitor</Text>
            <Text style={styles.normalText}>Get earthquake information in time</Text>
            <Text style={styles.normalText}>VER {appInfo.version}</Text>
            <Text style={styles.longText}>If you encountered any unsolvable problem (or bug) when using our app, please contact us with the following information. We will contact you as soon as possible.</Text>
            
            <Text style={styles.normalText}>Email: William@dekun.me</Text>
            <Text style={styles.normalText}>WeChat: Magnoliae_Flos </Text>

            <Text style={styles.subHeader}>UI</Text>
            <Text style={styles.normalText}>威廉母马</Text>
            <Text style={styles.subHeader}>Icons</Text>
            <Text style={styles.normalText}>老腊肉</Text>
            <Text style={styles.subHeader}>Development</Text>
            <Text style={styles.normalText}>威廉母马</Text>
            <Text style={styles.subHeader}>Support</Text>
            <Text style={styles.normalText}>老腊肉</Text>
            {/* 在这儿放个女朋友的名字应该也没人会注意到吧嘻嘻 */}
            <Text style={styles.normalText}>Vivian</Text>
        </Layout>
    )
}