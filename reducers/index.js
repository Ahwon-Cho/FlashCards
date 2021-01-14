import {ADD_DECK, RECEIVE_DECKS} from "../actions";

const INITIAL_STATE = {
  decks: {}
}
function decks (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        decks: action.decks
      }
    case ADD_DECK:
      const { decks } = state;
      return {
        decks: {
          ...decks,
          [action.deck.key]: action.deck
        }
      }
    default:
      return state;
  }
}

export default decks
