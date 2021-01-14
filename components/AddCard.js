import React from 'react'
import {Text, TextInput, View, Button, SafeAreaView, StyleSheet} from "react-native";
import {red} from "../utils/colors";
import {addCardToDeck, fetchDecks, saveDeck} from "../utils/api";
import {addDeck, receiveDecks} from "../actions";
import {connect} from "react-redux";

class AddCard extends React.Component {
  state = {
    answer: '',
    question: ''
  }
  addCard = (deck) => {
    if(this.state.question === '') {
      this.setState({
        inputError: 'Please enter the question'
      })
    } else if(this.state.answer === '') {
      this.setState({
        inputError: 'Please enter the answer'
      })
    } else {
      this.setState({
        inputError: ''
      })

      const question = {
        question: this.state.question,
        answer: this.state.answer
      }
      deck.questions.push(question)
      saveDeck({key: deck.key, deck})
        .then((saved) => {
          fetchDecks().then((decks) => {
            const { dispatch } = this.props;
            dispatch(receiveDecks(decks))
          })
          this.props.navigation.navigate('DeckDetail', {deck})
        })
    }

  }

  render() {
    const {deck} = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.label}>Question</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Question"
            onChangeText={text => this.setState({question: text})}
            value={this.state.question}
          />
          <Text style={styles.label}>Answer</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Answer"
            onChangeText={text => this.setState({answer: text})}
            value={this.state.answer}
          />
          <Text style={styles.error}>
            {this.state.inputError}
          </Text>
          <Button
            title="Submit"
            onPress={() => this.addCard(deck)}
          />
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  error: {
    color: red
  },
  label: {
    fontSize: 40

  },
  textInput: {
    fontSize: 40,
    padding: 15,
    borderWidth: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5

  }
});

function mapStateToProp({decks}) {
  return { decks }
}
export default connect(mapStateToProp)(AddCard);
