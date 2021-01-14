import { AsyncStorage } from 'react-native'
import {DECK_KEY} from "./_decks";

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_KEY).then(decks => JSON.parse(decks))
}

export function saveDeck({ key, deck}) {
  return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify(
    {[key]: deck}
  ))
}

export function addCardToDeck({key, card}) {
  return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify(
    {[key]: {
        ...[key],
        questions: [...card]
      }}
  ))
}

export function removeItem({key}) {
  return AsyncStorage.getItem(DECK_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECK_KEY, JSON.stringify(data))
    })
}

export function clear() {
  return AsyncStorage.clear()
}
