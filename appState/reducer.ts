import type { State, Action } from 'types';
import state from './state';

const reducer = (currentState: State = state, action: Action): State => {
  if (action.updateState === null || typeof action.updateState !== 'function') {
    return currentState;
  }

  return action.updateState(currentState);
};

export default reducer;
