import React from 'react'
import {Text, TextInput, View, Button, SafeAreaView, StyleSheet} from "react-native";
import {connect} from "react-redux";
import {addDeck} from "../actions";
import {red} from "../utils/colors";
import {fetchDecks, saveDeck} from "../utils/api";
import uuid from 'react-uuid'

class AddDeck extends React.Component {
  state = {
    title: '',
    inputError: ''
  }
  setText = (e) => {
    this.setState({
      title: e
    })
  }
  createDeck = (e) => {
    if(this.state.title === '') {
      this.setState({inputError: 'Please input the title'})
    } else {
      const key = uuid()
      const deck = {
        title: this.state.title,
        key: key,
        questions: []
      }


      this.props.dispatch(addDeck(deck))
      saveDeck({key, deck})
        .then(()=>{
          this.props.navigation.navigate('DeckDetail', {deck})

          this.setState({
            inputError: '',
            title: ''
          })
        })
    }

  }
  render() {
    return (
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.label}>What is title of your new deck? </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Title"
              onChangeText={text => this.setText(text)}
              value={this.state.title}
            />
            <Text style={styles.error}>
              {this.state.inputError}
            </Text>
            <Button
              title="Submit"
              onPress={this.createDeck}
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
export default connect(mapStateToProp)(AddDeck)
