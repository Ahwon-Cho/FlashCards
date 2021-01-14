import {View, Text, Button, StyleSheet, SafeAreaView} from "react-native";
import React from "react";
import {connect} from "react-redux";
import {fetchDecks, removeItem} from "../utils/api";
import {receiveDecks} from "../actions";
import Separator from "./common/Separator";

class DeckDetail extends React.Component {
  componentDidMount() {
    const {deck} = this.props.route.params
    this.props.navigation.setOptions({ title: deck.title })
  }
  addCard = (deck) => {
    this.props.navigation.navigate('AddCard', {deck})
  }
  startQuiz = (deck) => {
    this.props.navigation.navigate('StartQuiz', {deck})
  }
  deleteDeck = (deck) => {
    removeItem(deck).then(() => {
      fetchDecks().then((decks) => {
        this.props.dispatch(receiveDecks(decks))
        this.props.navigation.navigate('Decks')
      })
    })
  }
  render() {
    const {deck} = this.props.route.params

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.card}>Total Cards: {deck.questions.length}</Text>
          <Separator />
          <Button
            title="Add Card"
            onPress={() => {this.addCard(deck)}}
          />
          <Separator />
          <Button
            title="Start Quiz"
            onPress={() => {this.startQuiz(deck)}}
          />
          <Separator />
          <Button
            title="Delete Deck"
            onPress={() => {this.deleteDeck(deck)}}
          />
          <Separator />
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    justifyContent: 'center',
    textAlign: 'center'
  },
  card: {
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  }
});
function mapStateToProp({decks}) {
  return { decks }
}
export default connect(mapStateToProp)(DeckDetail)
