import {TouchableOpacity, Text} from "react-native";
import React from "react";

class DeckItem extends React.Component {
  componentDidMount () {
  }
  linkToDetail = (deck) => {
    this.props.navigation.navigate('DeckDetail', {deck})
  }
  render() {
    const {item} = this.props
    const numOfCards = item.questions != null && item.questions.length > 0 ? item.questions.length : 0
    return (
      <TouchableOpacity style={{padding: 2, borderWidth: 1, alignContent: 'center'}} onPress={() => this.linkToDetail(this.props.item)}>
        <Text style={{textAlign: 'center', fontSize: 20, alignContent: 'center'}}>{this.props.item.title}</Text>
        <Text style={{textAlign: 'center', fontSize: 20, alignContent: 'center'}}>{numOfCards} cards</Text>
      </TouchableOpacity>
    )
  }
}
export default DeckItem;
