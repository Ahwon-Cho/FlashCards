import { createStackNavigator } from '@react-navigation/stack';
import Decks from "./Decks";
import DeckDetail from "./DeckDetail";
import React from "react";
import {connect} from "react-redux";
import AddCard from "./AddCard";
import StartQuiz from "./StartQuiz";

const DeckStack = createStackNavigator();
class DeckStackNavi extends React.Component {

  render() {
    return (
      <DeckStack.Navigator>
        <DeckStack.Screen name="Decks" component={Decks} />
        <DeckStack.Screen name="DeckDetail" component={DeckDetail} />
        <DeckStack.Screen name="AddCard" component={AddCard} />
        <DeckStack.Screen name="StartQuiz" component={StartQuiz} />
      </DeckStack.Navigator>
    )
  }
}
function mapStateToProp({decks}) {
  return {
    decks
  }
}
export default connect(mapStateToProp)(DeckStackNavi)
