import { CHANGE_CHANNEL } from '../actions/channels';

const initialState = {
  currentChannelId: 2,
  // channels: []
}

export default function channels(state = initialState, action) {
  switch (action.type) {
  case CHANGE_CHANNEL:
    return { ...state, currentChannelId: action.payload };
  default:
    return state;
  }
}
