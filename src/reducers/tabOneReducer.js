import Actions from '../actions'

const initialState = {
  isLoading: true,
  products: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.TAB_ONE_DATA_REQUESTED:
      return {
        ...state,
        isLoading: true
      }
    case Actions.TAB_ONE_DATA_RECEIVED:
      return {
        ...state,
        isLoading: false,
        products: action.payload.products
      }
    default:
      return state
  }
}
