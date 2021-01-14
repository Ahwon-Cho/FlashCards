import {View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity} from "react-native";
import React from "react";
import {red} from "../utils/colors";
import CompleteQuiz from "./CompleteQuiz";
import Separator from "./common/Separator";

class StartQuiz extends React.Component {
  state = {
    currentQuestionIdx: 0,
    displayAnswer: true,
    numOfQuestions: 0,
    numOfCorrect: 0
  }
  componentDidMount() {
    this.setState({
      numOfQuestions: this.props.route.params.deck.questions.length
    })
  }
  flipDisplayAnswer() {
    this.setState((prep) => {
      return {displayAnswer: !prep.displayAnswer}
    })
  }
  answer(correct) {
    if(correct) {
      this.setState((prep) => {
        return { numOfCorrect: prep.numOfCorrect + 1, currentQuestionIdx: prep.currentQuestionIdx + 1 }
      })
    } else {
      this.setState((prep) => {
        return { currentQuestionIdx: prep.currentQuestionIdx + 1 }
      })
    }
  }
  startAgain = () => {
    this.setState({
      currentQuestionIdx: 0,
      displayAnswer: true,
      numOfCorrect: 0
    })
  }
  render() {
    const { navigation } = this.props;
    const { deck } = this.props.route.params;

    const currentQuestion = deck.questions[this.state.currentQuestionIdx];

    if(deck.questions === null || deck.questions.length == 0) {
      return (
        <SafeAreaView>
          <View>
            <Text style={{textAlign: 'center', color: red, fontSize: 40, alignContent: 'center'}}>Sorry, you cannot take a quiz because there are no cards in the deck</Text>
          </View>
        </SafeAreaView>
      )
    }
    if(this.state.currentQuestionIdx === deck.questions.length) {
      const score = (this.state.numOfCorrect / this.state.numOfQuestions) * 100
      return (
        <CompleteQuiz startAgain={this.startAgain} deck={deck} score={score}  navigation={navigation}/>
      )
    }
    const flipButtonLabel = this.state.displayAnswer ? 'Show Answer' : 'Show Question';
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.guide}>{this.state.currentQuestionIdx + 1}/{this.state.numOfQuestions}</Text>
        <Separator />
        {this.state.displayAnswer && (<Text style={styles.question}>{currentQuestion.question}</Text>)}
        {!this.state.displayAnswer && (<Text style={styles.question}>{currentQuestion.answer}</Text>)}
        <TouchableOpacity style={{alignContent: 'center'}} onPress={() => this.flipDisplayAnswer()}>
          <Text style={styles.label}>{flipButtonLabel}</Text>
        </TouchableOpacity>
        <View>
          <Separator />
          <Button title="Correct" onPress={()=> this.answer(true)}/>
          <Separator />
          <Button title="Incorrect" onPress={() => this.answer(false)}/>
          <Separator />
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  question: {
    fontSize: 40,
    justifyContent: 'center',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  label: {
    color: red,
    textAlign: 'center'
  },
  guide: {
    fontSize: 20,
  }
});
export default StartQuiz
