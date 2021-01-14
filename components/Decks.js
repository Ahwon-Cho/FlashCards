import React from 'react'
import {FlatList, View, Text, StyleSheet, SafeAreaView} from "react-native";
import {connect} from "react-redux";
import DeckItem from "./DeckItem";
import {fetchDecks, clear} from "../utils/api";
import {receiveDecks} from "../actions";

class Decks extends React.Component {
  componentDidMount () {
    fetchDecks()
      .then((decks) => {
        const { dispatch } = this.props
        dispatch(receiveDecks(decks))
      })

  }

  render() {
    const { navigation, decks } = this.props
    const list = decks != null && Object.keys(decks).length > 0 ? Object.keys(decks).map((key) => decks[key]) : null
    return (
      <SafeAreaView style={styles.container}>
      <View>
        {list === null && (
          <Text>No Deck is available. Please create a new deck</Text>)}
        <FlatList
          data={list}
          renderItem={({item}) => (
            <DeckItem key={item.key} item={item} navigation={navigation}/>
          ) }
        />
      </View>
      </SafeAreaView>
    )
  }
}

function mapStateToProp({decks}) {
  return { decks }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  }
});
export default connect(mapStateToProp)(Decks)
