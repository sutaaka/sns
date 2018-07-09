export const CHANGE_CHANNEL = 'CHANGE_CHANNEL'

export function changeChannel(ch) {
  return {
    type: CHANGE_CHANNEL,
    payload: ch
  };
}

