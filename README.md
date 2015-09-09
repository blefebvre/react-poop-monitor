# Poop Monitor


## You will need

- npm (tested with v2.13.3)
- Babel (`npm install --global babel`)
- PhoneGap (`npm install --global phonegap`)
- (optional) Xcode and Command Line Tools for running on iOS
- (optional) Android SDK for running on Android


## Build

Watch the source dir for changes to files containing JSX which Babel will transform into JavaScript:

	$ babel --watch app-js-src/ --out-dir www/js/build/


## Run

To run the app targetting a specific platform (tested on iOS and Android):

	$ phonegap run ios
	OR
	$ phonegap run android


## Test in a browser

Navigate to the `www/` dir, and run a web server (Python SimpleHTTPServer may not be available on platforms other than OS X, but any web server will do):

	$ cd www/
	$ python -m SimpleHTTPServer

In your browser, navigate to http://localhost:8000/ to try out the app.


## Use Firebase data provider instead of localStorage

// TODO


## Libraries

- [React](http://facebook.github.io/react/) - user interface framework
- [React Router](https://rackt.github.io/react-router/) - routing beween pages
- [React Intl](http://formatjs.io/react/) - internationalization for React apps
- [Ionic Framework CSS](http://ionicframework.com/) - mobile app UI elements
- [Firebase](https://www.firebase.com/) - realtime data storage
- [Cordova](https://cordova.apache.org/) - build native apps with web tech
- [FastClick](https://github.com/ftlabs/fastclick) - remove 300ms click delay on iOS