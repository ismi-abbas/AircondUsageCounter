
## Installation

To run the app just do npm install after cloning

```bash
  git clone https://github.com/ismi-abbas/AircondUsageCounter.git
  cd AircondUsageCounter
  npm install
```

For iOS you need to
```
  cd ios && pod install
```
```
  npx pod install
```

### Build the app bundle

First you need to generate a keystore - follow on React Native site

```
cd android

./gradlew bundleRelease
```

This will generate AAB file

Generate APK file by

```
cd android
./gradlew assembleRelease
```

Push using ADB if you don't have geninue Play Store user
```
cd android/app/build/outputs/apk/release

adb install app-release.apk
```
