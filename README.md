# Earthquake Monitor  
![header](https://i.loli.net/2020/12/31/s3XIMqFe67YLuQl.png)  
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/dekunma/EarthquakeMonitor-ReactNative/blob/master/LICENSE) [![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)  
**An android app developed using React Native**  
Get earthquake information across the world in time    
<br/>
<br/>

## Screenshots  
<div>
    <img src="https://i.loli.net/2020/12/31/Ks2nHjkqmM5U61d.png" width="300">
    <img src="https://i.loli.net/2020/12/31/YIin6lGBTFRdx7y.png" width="300">
    <img src="https://i.loli.net/2020/12/31/SMP8t6fZY9J3b7O.png" width="300">
    <img src="https://i.loli.net/2020/12/31/cXfaiHQW3jlxGg8.png" width="300">
    <img src="https://i.loli.net/2020/12/31/2JY79UsobhEK3RP.png" width="300">
</div>
<br/>
<br/>

## Features  
| Function | Status |
| - | - |
| Browse global earthquake data | ✅ |
| Filter data according to time and magnitude | ✅ |
| Show earthquakes in the past 24 hours in graph | ✅ |
| Data Caching | ✅ |
| Immersive and automatic dark mode | ✅ |
| Smooth animation | ✅ |

<br/>
<br/>

## Usage  
**1. Install dependencies:**  
in the root directory, do:   
```shell
yarn install
```
please make sure that you have already installed [yarn](https://yarnpkg.com/)  
<br/>

**2. Environment setup:**  
Configure React Native environment on your machine properly according to the [official guide](https://reactnative.dev/docs/environment-setup).  
You only need to configure the android environment since we only support android by far.  
If you are in China, we strongly recommend you follow [this guide provided by China React Native community](https://reactnative.cn/docs/environment-setup).  
We also strongly encourage you using a **real android device** instead of the emulator.
<br/>  
<br/>

**3.1. Start the app (development mode)**  
in the root directory, do:  
```shell
yarn react-native run-android  
```  
or  
```shell
yarn android  
```  
If the above process takes a long time (>= 5 minutes), you can open **/android** directory in **android studio** and let it download dependencies automatically, and then run the above command to start the app.  
<br/>  
<br/>

**3.2. Start the app (release mode)**  
in the root directory, do:  
```shell
yarn react-native run-android --variant=release  
```  
make sure the above command builds the app sucessfully before moving on to releasing.  
<br/>
<br/>

**4. Build the APK file**  
Please follow [this guide](https://reactnative.dev/docs/signed-apk-android)  
to generate keystore and use gradle wrapper to build.  
You **do not need** to build a bundle before building the APK file.  
<br/>
<br/>  

## Acknowledgement  
This app is based on the concepts and design of the IOS app [地震监测](https://apps.apple.com/cn/app/%E5%9C%B0%E9%9C%87%E7%9B%91%E6%B5%8B/id1480798720#?platform=iphone) developed by [老腊肉](https://github.com/laolarou726).  
The UI of this app is primarily accomplished by adapting [UI Kitten](https://github.com/akveo/react-native-ui-kitten).   
The API is provided by [US Geological Survey](https://earthquake.usgs.gov/fdsnws/event/1/).  
<br/>
<br/>

## Special Thanks  
- [老腊肉](https://github.com/laolarou726)  
- [Jimmy Keesee](https://github.com/keesee)    
- My girl friend who does not have a Github account : )  
<br/>
<br/>
  
## Contact  
**If you encountered any technical difficulties (or bugs) when using our app, please contact me with the following information:**  
- Email: William@dekun.me  
- WeChat: Magnoliae_Flos  
<br/>
<br/>

## Licensing  
This project is licensed under **MIT**.  
It means that you can do anyting to our code, except that you must include copyright notice and permission notice in all copies or substantial portions of your software.  
  
  
**If you like our project, please give a star!**
