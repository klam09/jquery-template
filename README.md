## Jquery template by klam09

## Setup
Install dependencies
```bash
$ yarn install
```

## Start Dev server
```bash
$ yarn start
```

## Build
Build with devtool
```bash
$ yarn build:dev
```

Build with calling HSBC mobile hook
```bash
$ yarn build
```

## Test with WebView
### IOS
```
yarn build:ios
```
1. build package with above command. 
2. Open 'tools/iosWebView/KbWebViewContainer.xcodeproj' with XCode.
3. Build and test it in simulator.

### AOS
```
yarn build:aos
```
1. build package with above command.
2. Open 'tools/aosWebView' with Android Studio.
3. Build and test it in emulator / real device.
