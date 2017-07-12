import {Navigation} from "react-native-navigation";
import {appInitialized} from "./actions/login";
import {registerScreens} from "./screens";
import {Platform} from "react-native";
var { Provider } = require('react-redux');
var { configureGlobalStore } = require('./store/configureStore');
export default class App {
  constructor() {
    this.store = configureGlobalStore(() => {
      this.store.subscribe(this.onStoreUpdate.bind(this));
      this.store.dispatch(appInitialized());
    });
    registerScreens(this.store, Provider);
  }

  onStoreUpdate() {
    const { root } = this.store.getState().login;
    if (this.currentRoot !== root) {
      this.currentRoot = root;

      if (root === 'logout') {
        //this.flushStorageAndRestart();
        alert('告诉原生重新启动');
      } else {
        this.startApp(root);
      }
    }
  }

  startApp(root) {
    switch (root) {
      case 'login':
          Navigation.startSingleScreenApp({
            screen: {
              screen: 'example.LoginScreen',
              title: 'Login',
              navigatorStyle: {}
            },
            passProps: {
              str: 'This is a prop passed in \'startSingleScreenApp()\'!',
              obj: {
                str: 'This is a prop passed in an object!',
                arr: [
                  {
                    str: 'This is a prop in an object in an array in an object!'
                  }
                ],
                arr2: [
                  [
                    'array of strings',
                    'with two strings'
                  ],
                  [
                    1, 2, 3
                  ]
                ]
              },
              num: 1234,
              fn: function() {
                return 'Hello from a function!';
              }
            }
          });
        return;
      case 'after-login':
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'One',
              screen: 'example.FirstTabScreen',
              icon: require('../img/one.png'),
              selectedIcon: require('../img/one_selected.png'),
              title: 'Screen One',
              overrideBackPress: true,
              navigatorStyle: {}
            },
            {
              label: 'Two',
              screen: 'example.SecondTabScreen',
              icon: require('../img/two.png'),
              selectedIcon: require('../img/two_selected.png'),
              title: 'Screen Two',
              navigatorStyle: {}
            }
          ],
          passProps: {
            str: 'This is a prop passed in \'startTabBasedApp\'!',
            obj: {
              str: 'This is a prop passed in an object!',
              arr: [
                {
                  str: 'This is a prop in an object in an array in an object!'
                }
              ]
            },
            num: 1234
          },
          animationType: 'slide-down',
          title: 'Redux Example',
          drawer: { // optional, add this if you want a side menu drawer in your app
            left: { // optional, define if you want a drawer from the left
              screen: 'example.BottomTabsSideMenu' // unique ID registered with Navigation.registerScreen
            },
            disableOpenGesture: false, // optional, can the drawer be opened with a swipe instead of button
            passProps: {
              title: 'Hello from SideMenu'
            }
          },
          appStyle: {
            bottomTabBadgeTextColor: '#ffffff',
            bottomTabBadgeBackgroundColor: '#ff0000'
          }
        });
        return;
      default:
        console.error('Unknown app root');
    }
  }
}
