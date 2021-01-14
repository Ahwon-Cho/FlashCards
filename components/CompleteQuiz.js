import React from 'react'
import {SafeAreaView, Text, Button, StyleSheet} from "react-native";
import {
  clearLocalNotification,
  setLocalNotification
} from "../utils/helper";

class CompleteQuiz extends React.Component {
  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }
  goToDecks = (deck) => {
    this.props.navigation.navigate('DeckDetail', {deck})
  }
  startAgain = () => {
    this.props.startAgain()
  }
  render() {
    const {score, deck} = this.props
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Quiz Completed</Text>
        <Text style={styles.title}>Your score is {score.toFixed()}%</Text>
        <Button title="Start Over" onPress={() => this.startAgain()} />
        <Button title="Go back to Deck" onPress={() => this.goToDecks(deck)} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    justifyContent: 'center',
    textAlign: 'center'
  },
  score: {
    fontSize: 40,
    justifyContent: 'center',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    borderColor: '#737373',
    borderWidth: 1
  }
});
export default CompleteQuiz
