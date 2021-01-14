import * as React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";
import Ionicons from '@expo/vector-icons/Ionicons';
import {createStore} from "redux";
import reducer from './reducers'
import {Provider} from "react-redux";
import DeckStackNavi from "./components/DeckStackNavi";
import {setLocalNotification} from "./utils/helper";

const Tab = createBottomTabNavigator();
export default class App extends React.Component{

  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Decks') {
                  if(Platform.OS === 'ios') {
                    iconName = focused
                      ? 'ios-file-tray-stacked'
                      : 'ios-file-tray-stacked-outline';
                  } else {
                    iconName = focused
                      ? 'file-tray-stacked'
                      : 'file-tray-stacked-outline';
                  }
                } else if (route.name === 'Add Deck') {
                  if(Platform.OS === 'ios') {
                    iconName = focused
                      ? 'ios-add'
                      : 'ios-add-outline';
                  } else {
                    iconName = focused
                      ? 'add'
                      : 'add-outline';
                  }
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}

          >
            <Tab.Screen name="Decks" component={DeckStackNavi} />
            <Tab.Screen name="Add Deck" component={AddDeck} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

