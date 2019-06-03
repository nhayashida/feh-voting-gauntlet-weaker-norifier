import { ActionType, Hero } from './types';

export const setHeroes = (heroes: Hero[]) => ({
  heroes,
  type: ActionType.SET_HEROES,
});
