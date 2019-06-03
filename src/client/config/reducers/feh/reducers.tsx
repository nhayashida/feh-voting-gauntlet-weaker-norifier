import { combineReducers } from 'redux';
import { ActionType, Hero, FehActionTypes, FehState } from './types';

const initState: FehState = {
  heroes: [] as Hero[],
};

const heroes = (state = initState.heroes, action: FehActionTypes) => {
  switch (action.type) {
    case ActionType.SET_HEROES:
      return action.heroes;
  }

  return state;
};

export const fehReducer = combineReducers({
  heroes,
});
